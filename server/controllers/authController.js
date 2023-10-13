import { validationResult, matchedData } from 'express-validator';
import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import mongoose from 'mongoose';
import User from '../model/User.js';
import passport from 'passport';

export const authController = {
    register: async (req, res) => {
        // CHECK: Need to handle validator invalid results here, or can do within validator middleware?
        const data = matchedData(req);
        console.log(data);

        // TEMP (simple):
        let status;
        try {
            // Check if user already exists
            let user = await User.findOne({ email: data.email });
            if (!user) {
                status = 401;
                throw new Error('Email not in system');
            }
            console.log(user);

            // Update the password
            if (!user.password) {
                user.password = data.password;
                user.markModified('password');
                user = await user.save();

                console.log(user); // <-- check that password is hashed
                res.json({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    message: 'Password set successfully',
                });
            } else {
                status = 401;
                throw new Error('User already registered');
            }
        } catch (error) {
            console.log(error);
            res.status(status || 500).json({ error: error.message });
        }

        // TODO (later): Update this^. Probably want to add email verification before allow create password.
        // How to allow registration only if already in the db?
        // And/or create temporary password that is emailed to admin, required to change when login...
    },

    login: async (req, res, next) => {
        passport.authenticate(
            'login',
            { session: false },
            async (error, user, info) => {
                // console.log('Message: ', info);
                if (error || !user) {
                    console.log('Message: ', info);
                    return res.status(401).json({
                        message: 'Invalid email or password',
                    });
                }
                // if user doesn't have mfa set up/enabled, complete login, return auth token
                if (!user.mfaEnabled) {
                    return res.json({
                        message: info.message,
                        mfaEnabled: false,
                        token: jwt.sign(
                            { user: { email: user.email } },
                            process.env.JWT_SECRET,
                            {
                                algorithm: process.env.JWT_ALG,
                                issuer: process.env.JWT_ISS,
                                audience: process.env.JWT_AUTH_AUD,
                            }
                        ),
                    });
                } else {
                    // if mfa enabled, send temp token that confirms authorized to go to step 2
                    return res.json({
                        message: 'Please complete 2-factor authentication',
                        mfaEnabled: true,
                        loginPasswordVerifiedToken: jwt.sign(
                            {
                                // This must be *different* from final authentication token,
                                // given once correct 2nd factor code received.
                                loginPasswordVerified: { email: user.email },
                            },
                            process.env.JWT_SECRET,
                            {
                                algorithm: process.env.JWT_ALG,
                                issuer: process.env.JWT_ISS,
                                audience: process.env.JWT_MFA_AUD,
                                expiresIn: '5m',
                            }
                        ),
                    });
                }
            }
        )(req, res, next);
    },

    loginMFA: async (req, res) => {
        console.log(req.body);
        console.log(req.user.loginPasswordVerifiedToken);
        // let loginPasswordVerifiedToken = null;
        // try {
        //     loginPasswordVerifiedToken = jwt.verify(
        //         req.user.loginPasswordVerifiedToken,
        //         process.env.JWT_SECRET
        //     );
        // } catch (error) {
        //     return res.status(401).json({
        //         message: 'You are not authorized to perform login step-2',
        //     });
        // }

        const token = req.body.OTPcode.replaceAll(' ', ''); // --> TODO: Replace with express-validator middleware
        const user = await User.findOne({
            email: req.user.loginPasswordVerifiedToken.loginPasswordVerified
                .email,
        });
        if (!authenticator.check(token, user.mfaAppSecret)) {
            return res.status(400).json({
                message: 'OTP verification failed: Invalid token',
            });
        } else {
            return res.json({
                message: 'OTP verification successful',
                token: jwt.sign(
                    {
                        user: { email: user.email },
                    },
                    process.env.JWT_SECRET,
                    {
                        algorithm: process.env.JWT_ALG,
                        issuer: process.env.JWT_ISS,
                        audience: process.env.JWT_AUTH_AUD,
                    }
                ),
            });
        }
    },

    jwtAuth: async (req, res) => {
        return res.json({
            message: 'Success',
            user: req.user,
        });
    },

    generateMfaSecret: async (req, res) => {
        const user = await User.findOne({ email: req.user.email });

        // Check mfa enabled status - don't generate if already set up
        // TODO(?): Add "if mfaEnabled && mfaAppSecret", and send along the existing app secret?
        // (Any reason not to make the already-generated secret available on request?)
        if (user.mfaEnabled) {
            return res.status(400).json({
                message: '2FA already verified and enabled',
                mfaEnabled: user.mfaEnabled,
            });
        }

        const secret = authenticator.generateSecret();
        user.mfaAppSecret = secret;
        user.save();
        const appName = 'Author Website Admin Portal';

        // TODO: Check if way to offer the otpauth code as copy-paste option (if qrcode doesn't work)?
        return res.json({
            message: '2FA secret generation successful',
            secret: secret,
            qrImageDataUrl: await qrcode.toDataURL(
                authenticator.keyuri(req.user.email, appName, secret)
            ),
            mfaEnabled: user.mfaEnabled,
        });
    },

    verifyOTP: async (req, res) => {
        const user = await User.findOne({ email: req.user.email });

        // TODO: Like with ^generateMfa, is the following necessary as-is? What if they need to register new app?
        if (user.mfaEnabled) {
            return res.json({
                message: '2FA already verified and enabled',
                mfaEnabled: user.mfaEnabled,
            });
        }

        const token = req.body.OTPtoken.replaceAll(' ', ''); //--> TODO: replace with express-validator middleware
        if (!authenticator.check(token, user.mfaAppSecret)) {
            return res.status(400).json({
                message: 'OTP verification failed: Invalid token',
                mfaEnabled: user.mfaEnabled,
            });
        } else {
            user.mfaEnabled = true;
            user.save();

            return res.json({
                message: 'OTP verification successful',
                mfaEnabled: user.mfaEnabled,
            });
        }
    },

    disableMfa: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.user.email });
            user.mfaEnabled = false;
            user.mfaAppSecret = '';
            await user.save();

            return res.json({
                message: '2FA disabled successfully',
                mfaEnabled: user.mfaEnabled,
            });
        } catch (error) {
            console.log('Error disabling 2fa: ', error);
            return res.status(400).json({
                message: 'Error disabling 2FA',
            });
        }
    },
};
