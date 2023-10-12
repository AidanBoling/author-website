import { validationResult, matchedData } from 'express-validator';
import jwt from 'jsonwebtoken';
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
                        message: info,
                        mfaEnabled: false,
                        token: jwt.sign(
                            { user: { email: user.email } },
                            process.env.JWT_SECRET
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
                            { expiresIn: '5m' }
                        ),
                    });
                }
            }
        )(req, res, next);
    },
};
