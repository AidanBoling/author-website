import { matchedData } from 'express-validator';
import { authenticator } from 'otplib';
import User from '../model/User.js';
import EmailOTP from '../model/EmailOTP.js';
import passport from 'passport';
import {
    // getAuthToken,
    // getFingerprint,
    // getFingerprintHash,
    getMFALoginToken,
    FPT_COOKIE_OPTIONS,
} from '../utils/authUtilities.js';
import sendOTPCodeEmail from '../utils/sendOTPemail.js';
// import cookieParser from 'cookie-parser';

export const passportAuthenticate = {
    passwordLogin: (req, res, next) => {
        passport.authenticate(
            'login',
            { failureMessage: true },
            async (error, user, info) => {
                // // TEMP TEST:
                // console.log('Login request info: ', req);
                // //
                if (!user) {
                    console.log('Message: ', info);
                    return res.status(401).json({
                        message: 'Invalid email or password',
                    });
                }
                if (error)
                    return res.status(500).json({
                        message: 'Error',
                    });

                // If user doesn't have mfa set up/enabled, complete login & return auth token
                if (!user.mfa.enabled) {
                    req.login(user, next); // Call passport login function (to set req.user and send to session)
                    User.saveLogin(user);
                } else {
                    // if mfa enabled, send temp token that confirms authorized to go to step 2
                    return res.json({
                        message: 'Please complete 2-factor authentication',
                        challenge: 'MFA',
                        user: user.email,
                        mfa: {
                            enabled: user.mfa.enabled,
                            defaultMethod: user.mfa.defaultMethod,
                            methodsCount: user.mfa.methodsVerified,
                        },
                        preAuthToken: getMFALoginToken(user),
                        // ^TODO?: May want to implement user fingerprint, so have way to invalidate token
                        // from server side (deleting the cookie)?
                    });
                }
            }
        )(req, res, next);
    },

    mfaAuthCheck: (req, res, next) => {
        passport.authenticate(
            'loginJwt',
            { failureMessage: true },
            async (error, user, info) => {
                if (!user) {
                    console.log('No user returned -> Invalid or expired token');
                    return res.status(401).json({
                        message: 'Invalid or expired token',
                    });
                }
                if (error) {
                    console.log('Some error occurred with checking token');

                    return res.status(500).json({
                        message: 'Error',
                    });
                }
                authController.authCheck(req, res);
            }
        )(req, res, next);
    },

    mfaLogin: (req, res, next) => {
        passport.authenticate(
            'loginJwt',
            { failureMessage: true },
            async (error, user, info) => {
                if (!user) {
                    console.log('No user returned -> Invalid or expired token');
                    return res.status(401).json({
                        message: 'Invalid or expired token',
                    });
                }
                if (error) {
                    console.log('Some error occurred with checking token');

                    return res.status(500).json({
                        message: 'Error',
                    });
                }

                // JWT verified, now check OTP code:
                console.log('JWT verified, checking OTP code...');

                const { method, otpCode } = matchedData(req);
                let isValid;

                if (method === 'authApp') {
                    isValid = authenticator.check(otpCode, user.mfaAppSecret);
                } else if (method === 'email') {
                    isValid = await EmailOTP.verifyEmailOTP(user._id, otpCode);
                }

                if (isValid) {
                    console.log('Code validated. Saving login data...');
                    User.saveLogin(user);
                    req.login(user, next); // Call passport login function (to set req.user and send to session)
                } else {
                    // TODO (maybe/later): Add mechanism to allow certain number of tries,
                    // reduced by one here on each failed attempt, before denying?
                    return res.status(401).json({
                        message: 'Invalid or expired token',
                    });
                }
            }
        )(req, res, next);
    },
};

export const authController = {
    login: (req, res) => {
        // This is reached only if user fully authenticated and session created (whether mfa enabled or not)
        console.log(
            `User ${req.user.email} was logged in to session ID: `,
            req.sessionID
        );
        console.log(req.session);

        return res.json({
            message: 'Success',
            user: req.user.email,
        });
    },

    logout: (req, res) => {
        if (req.user) {
            console.log(
                `User ${req.user.email} is logging out of session: `,
                req.sessionID
            );
            req.session.cookie.maxAge = 1;
            req.logout(error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('User logged out');
                    req.session.regenerate(function (error) {
                        console.log(error);
                    });
                }
            });
        } else {
            console.log('Logout initiated, but no user to be logged out.');
        }

        res.json({
            message: 'Logged out',
        });

        // return res.clearCookie('Fpt').json({
        //     message: 'Logged out',
        //     user: req.user,
        // });
    },

    emailOTP: async (req, res) => {
        console.log('Send email route triggered...');

        // [-] TODO (production prep):
        const { email } = matchedData(req);
        if (!email) {
            throw new Error('Invalid email');
        }

        try {
            const user = await User.findOne({ email: { $eq: email } });
            if (!user) throw new Error('User not found');

            const emailRecipient =
                process.env.NODE_ENV === 'production'
                    ? user.email
                    : process.env.TEST_EMAIL_RECIPIENT;

            sendOTPCodeEmail(user._id, emailRecipient);
            res.json({ message: 'Success' });
        } catch (error) {
            console.log('Error sending OTP code email: ', error);
            res.status(500).json({
                message: 'Server error. Contact your site admin.',
            });
        }
    },

    authCheck: (req, res) => {
        console.log('Auth check: OK');
        res.json({ message: 'Security check ok' });
    },
};

// Temp Archive ----------------------------

// register: async (req, res) => {
//     // CHECK: Need to handle validator invalid results here, or can do within validator middleware?
//     const data = matchedData(req);
//     console.log(data);

//     // TEMP (simple):
//     let status;
//     try {
//         //TODO: Change for security:
//         // Do email as step 1,
//         // Then verify email by sending email with step 2 token (vague message like: 'if email is valid to register, email will be sent to you...',
//         // Then they can click link, enter new password.
//         // (also, log registration attempts)

//         // Check if user already exists
//         let user = await User.findOne({ email: data.email });
//         if (!user) {
//             status = 401;
//             throw new Error('Invalid.');
//         }
//         console.log(user);

//         // Update the password
//         if (!user.password) {
//             user.password = data.password;
//             user.markModified('password');
//             user = await user.save();

//             console.log(user); // <-- check that password is hashed
//             res.json({
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 message: 'Password set successfully',
//             });
//         } else {
//             status = 401;
//             throw new Error('User already registered');
//         }
//     } catch (error) {
//         console.log(error);
//         if (status) {
//             res.status(status).json({ error: 'Invalid' });
//         } else {
//             res.status(500).json({ error: error.message });
//         }
//     }

// },

// loginJWTAuth: async (req, res, next) => {
//     passport.authenticate(
//         'login',
//         { session: false },
//         async (error, user, info) => {
//             if (error || !user) {
//                 console.log('Message: ', info);
//                 return res.status(401).json({
//                     message: 'Invalid email or password',
//                 });
//             }

//             const fingerprint = getFingerprint();
//             const fingerprintHash = getFingerprintHash(fingerprint);

//             // if user doesn't have mfa set up/enabled, complete login & return auth token
//             if (!user.mfaEnabled) {
//                 // NOTE: change cookie name "fpt" to __Secure-Fpt in production

//                 return res
//                     .cookie('Fpt', fingerprint, FPT_COOKIE_OPTIONS)
//                     .json({
//                         message: info.message,
//                         mfaEnabled: false,
//                         token: getAuthToken(user, fingerprintHash),
//                     });
//             } else {
//                 // if mfa enabled, send temp token that confirms authorized to go to step 2
//                 return res.json({
//                     message: 'Please complete 2-factor authentication',
//                     mfaEnabled: true,
//                     loginPasswordVerifiedToken: getMFALoginToken(user),
//                 });
//             }
//         }
//     )(req, res, next);
// },

// loginMfaJwtAuth: async (req, res) => {
//     console.log(req.body);
//     // console.log(req.user.loginPasswordVerifiedToken);
//     // let loginPasswordVerifiedToken = null;
//     // try {
//     //     loginPasswordVerifiedToken = jwt.verify(
//     //         req.user.loginPasswordVerifiedToken,
//     //         process.env.JWT_SECRET
//     //     );
//     // } catch (error) {
//     //     return res.status(401).json({
//     //         message: 'You are not authorized to perform login step-2',
//     //     });
//     // }
//     // const user = await User.findOne({
//     //     email: req.user.loginPasswordVerifiedToken.loginPasswordVerified
//     //         .email,
//     // });

//     // User passed jwt (temp token) auth, now check OTP code

//     const token = req.body.OTPcode.replaceAll(' ', ''); // --> TODO: Replace with express-validator middleware

//     if (!authenticator.check(token, req.user.mfaAppSecret)) {
//         return res.status(400).json({
//             message: 'OTP verification failed: Invalid token',
//         });
//     } else {
//         const fingerprint = getFingerprint();
//         const fingerprintHash = getFingerprintHash(fingerprint);

//         // NOTE: change cookie name "fpt" to __Secure-Fpt in production
//         return res.cookie('Fpt', fingerprint, FPT_COOKIE_OPTIONS).json({
//             message: 'OTP verification successful',
//             token: getAuthToken(req.user),
//         });
//     }
// },

// jwtAuth: async (req, res) => {
//     return res.json({
//         message: 'Success',
//         user: req.user,
//     });
// },
