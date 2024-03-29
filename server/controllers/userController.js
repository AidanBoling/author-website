import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import User from '../model/User.js';
import Code from '../model/Code.js';
import EmailOTP from '../model/EmailOTP.js';
import sendAccountInfoEmail from '../utils/sendAccountInfoEmail.js';
import { generateTokenLink } from '../utils/userUtilities.js';
import sendOTPCodeEmail from '../utils/sendOTPemail.js';
import { matchedData } from 'express-validator';

const isDev = process.env.NODE_ENV !== 'production';

// TODO: Make sure initial access Code is deleted at an appropriate point
// (when email sends successfully? Or when user completes update action?)
// CONSIDER: Connect access code with the generated token somehow?

export const userController = {
    // Used to handle (admin-created) codes. Initiates registration and password reset process.
    // Preceded by checking code with custom middleware (verify.accessCode)
    accessRequest: async (req, res) => {
        const emailRecipient = !isDev
            ? req.user.email
            : process.env.TEST_EMAIL_RECIPIENT;

        try {
            const link = await generateTokenLink(req.codePurpose, req.user._id);

            //TODO: Check error handling for email -- what error to send back? What response to user?
            if (
                req.codePurpose === 'passwordReset' ||
                req.codePurpose === 'register'
            ) {
                sendAccountInfoEmail(
                    { link: link },
                    emailRecipient,
                    req.codePurpose,
                    'request'
                );
                res.json({
                    message: `Success - email for ${req.codePurpose} should have been sent`,
                });
            } else {
                // superfluous, with earlier validation
                throw new Error('Invalid purpose');
            }
        } catch (error) {
            if (error.message === 'Invalid purpose') {
                // superfluous, with earlier validation
                res.status(401).json({ error: 'Invalid' });
            } else {
                console.log(`Error with ${req.codePurpose} request: `, error);
                res.status(500).json({ error: 'Error' });
            }
        }
    },

    // Final route taken when user updates their info via approved account registration
    // Preceded by dedicated custom middleware (verify.userUpdateToken) to verify token valid, and that
    // the user linked to the token matches the email submitted by the user.
    // TODO: Also delete admin-created token on success
    completeAccountSetup: async (req, res) => {
        const { id, name, email, password } = req.data;

        try {
            const user = await User.verifyIdEmailMatch(id, email);
            if (!user) {
                throw new Error('Invalid');
            }

            // Update user's information, only if user doesn't yet have password set
            if (!user.password) {
                const emailRecipient = !isDev
                    ? user.email
                    : process.env.TEST_EMAIL_RECIPIENT;

                user.name = name;
                user.password = password;
                user.markModified('password'); // this triggers it to be hashed on save()
                await user.save();

                res.status(200).json({
                    email: user.email,
                    message: 'Account registration completed',
                });
                // TODO (later): on front end - have this page redirect them to login page.

                // Delete the temp access code
                console.log('Deleting initial code...');
                await Code.deleteOne({
                    userId: user._id,
                    purpose: 'register',
                }).catch(() =>
                    console.log(
                        'There was an error in deleting the access code!'
                    )
                );

                // Send email notifying of account created
                sendAccountInfoEmail(
                    { name: user.name },
                    emailRecipient,
                    'register',
                    'success'
                );
            } else {
                console.log(
                    "User's password already set; use reset password process instead."
                );
                throw new Error('User already registered');
            }
        } catch (error) {
            console.log('Error with account setup: ', error);
            res.status(500).json({
                message:
                    'Error registering account. Contact your website admin',
            });
        }

        // Delete email token (whether setup is successful or not)
        console.log('Deleting token...');
        await req.token
            .deleteOne()
            .catch(() =>
                console.log(
                    'There was an error in deleting the register token!'
                )
            );
    },

    // Processes password reset submission
    // [-]TODO: preceded by validation and sanitization middleware (for email, and for password (min/max length, other security requirements, and that password entries match),
    // Preceded by dedicated custom middleware to validate token (verify.userUpdateToken)
    // TODO: Also delete admin-created token on success

    passwordReset: async (req, res) => {
        console.log(
            'Token verification passed, continuing password reset process...'
        );
        // let status;

        try {
            // Additional auth check: check submitted userId matches
            // the email submitted. If match, returns user
            const user = await User.verifyIdEmailMatch(
                req.data.id,
                req.data.email
            );
            if (!user) {
                throw new Error('Invalid');
            }

            if (user.password) {
                const emailRecipient = !isDev
                    ? user.email
                    : process.env.TEST_EMAIL_RECIPIENT;

                // Update user's password
                user.password = req.data.password;
                user.markModified('password');
                await user.save();

                res.json({
                    email: user.email,
                    message: 'Password reset successfully',
                });

                // Delete the temp access code
                console.log('Deleting initial code...');
                await Code.deleteOne({
                    userId: user._id,
                    purpose: 'register',
                }).catch(() =>
                    console.log(
                        'There was an error in deleting the access code!'
                    )
                );

                // Send email notifying of password reset
                sendAccountInfoEmail(
                    { name: user.name },
                    emailRecipient,
                    'passwordReset',
                    'success'
                );
            } else {
                console.log(
                    'User account not yet registered; use registration process instead.'
                );
                throw new Error('User not yet registered');
            }
        } catch (error) {
            console.log('Error updating user account: ', error);
            // TODO (maybe): Send user email about error?
            res.status(500).json({
                message: 'Error resetting password. Contact your website admin',
            });
        }

        // Delete emailed token (whether reset is sucessful or not)
        await req.token
            .deleteOne()
            .catch(() =>
                console.log(
                    'There was an error in deleting the password reset token!'
                )
            );
    },

    passwordChange: async (req, res) => {
        console.log('Starting password change request...');
        const { currentPassword, password } = matchedData(req);

        try {
            // Verify submitted current password matches password of user found in session
            const sessionUserEmail = req.user.email;

            const user = await User.authenticate(
                sessionUserEmail,
                currentPassword
            );

            if (!user) {
                console.log('Error: User current password not authenticated.');
                throw new Error('Invalid');
            }

            const emailRecipient = !isDev
                ? user.email
                : process.env.TEST_EMAIL_RECIPIENT;

            // Authenticated; Update user's password
            user.password = password;
            user.markModified('password');
            await user.save();

            res.json({
                email: user.email,
                message: 'Password changed successfully',
            });

            //TODO (??): Force user logout/login after password change??? Or, regenerate session??

            // Send email notifying of password change
            sendAccountInfoEmail(
                { name: user.name },
                emailRecipient,
                'passwordChange'
            );
        } catch (error) {
            console.log('Error updating user account: ', error);
            if (error.message === 'Invalid') {
                res.status(401).json({
                    message: 'Invalid',
                });
            } else {
                res.status(500).json({
                    message:
                        'Unable to change password. Contact your website admin',
                });
            }
        }
    },

    setUpMfa: async (req, res) => {
        const { method } = matchedData(req);
        console.log('Starting mfa setup route...');

        try {
            // Find the user (from session info)
            const user = await User.findById(req.user.id);
            console.log('found user: ', user.email);

            // For Authentication App:
            if (method === 'authApp') {
                // if user doesn't have an appSecret yet, then generate new. Otherwise, use existing.

                let secret;
                if (!user.mfaAppSecret) {
                    console.log('Generating new secret...');
                    secret = await generateMfaSecret(user);
                } else {
                    console.log('Secret already generated for this user');
                    secret = user.mfaAppSecret;
                }

                // Get the otp urls (qr code data url, plain otpauth url) using secret
                const otpData = await generateAppOtpData(
                    req.user.email,
                    secret
                );

                // Enable method, if not yet enabled
                if (!user.mfaMethods.authApp.enabled) {
                    user.mfaMethods.authApp = {
                        enabled: true,
                        verified: false,
                    };
                    await user.save();
                }

                // Send back the otp data for the user
                res.json({
                    message: '2FA secret generation successful',
                    ...otpData,
                });
            }
            // For Email:
            else if (method === 'email') {
                const emailRecipient = !isDev
                    ? req.user.email
                    : process.env.TEST_EMAIL_RECIPIENT;

                // Enable method, if not yet enabled
                if (!user.mfaMethods.email.enabled) {
                    user.mfaMethods.email = {
                        enabled: true,
                        verified: false,
                    };
                    await user.save();
                }

                // Generate and email otp code
                sendOTPCodeEmail(user._id, emailRecipient);

                console.log('Success -- code sent');

                res.json({
                    message: 'Email method enabled, pending verification',
                });
            }
        } catch (error) {
            console.log('Error with MFA setup: ', error);
            res.status(500).json({
                message: 'Error enabling 2FA method',
            });
        }
    },

    // [-] TODO: Add validation for input
    verifyMfaMethod: async (req, res) => {
        console.log('Starting MFA method verification...');
        const { method, otpCode } = matchedData(req);

        try {
            // Find verified user
            const user = await User.findById(req.user.id);
            let isValid;

            // Check for method verification status (? Need this?)
            // if (user.mfaMethods[req.body.method]['verified']) {return "200, verified"}

            // Verify authenticator app:
            if (method === 'authApp') {
                // const otpCode = req.body.code.replaceAll(' ', ''); //--> TODO: replace with express-validator middleware
                isValid = authenticator.check(otpCode, user.mfaAppSecret);
                if (isValid) {
                    user.mfaMethods.authApp.verified = true;
                    await user.save();
                }
            }
            // Verify email code:
            if (method === 'email') {
                isValid = await EmailOTP.verifyEmailOTP(user._id, otpCode);
                if (isValid) {
                    user.mfaMethods.email.verified = true;
                    // user.mfaMethodsVerified = user.mfaMethodsVerified + 1;
                    await user.save();
                }
            }

            if (!isValid) {
                return res.status(401).json({
                    message: 'OTP verification failed: Invalid code',
                });
            }

            //Once at least ONE method verified, set mfaEnabled to true.
            if (
                !user.mfa.enabled &&
                (user.mfaMethods.authApp.verified ||
                    user.mfaMethods.email.verified)
            ) {
                user.mfa.enabled = true;
                user.mfa.defaultMethod = method;
                await user.save();
            }

            console.log('Success');

            return res.json({
                message: 'OTP verification successful',
            });
        } catch (error) {
            console.log('Error with OTP verification: ', error);
            return res.status(500).json({
                message: 'OTP verification failed: Server error',
            });
        }
    },

    //TODO: set mfaMethods... all equal false
    disableMfa: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.user.email });
            user.mfa.enabled = false;
            user.mfaAppSecret = '';
            await user.save();

            return res.json({
                message: '2FA disabled successfully',
                mfaEnabled: user.mfa.enabled,
            });
        } catch (error) {
            console.log('Error disabling 2fa: ', error);
            return res.status(500).json({
                message: 'Error disabling 2FA',
            });
        }
    },

    changeName: async (req, res) => {
        const { name } = matchedData(req);
        try {
            const user = await User.findOne({ email: req.user.email });
            user.name = name;
            await user.save();

            return res.json({
                message: 'Name updated successfully',
                mfaEnabled: user.mfa.enabled,
            });
        } catch (error) {
            console.log('Error updating user name: ', error);
            return res.status(500).json({
                message: 'Error updating user info',
            });
        }
    },
};

// TODO: Move these to another file (userUtilities?)
async function generateMfaSecret(user) {
    try {
        const secret = authenticator.generateSecret();
        user.mfaAppSecret = secret;
        await user.save();

        console.log('2FA App secret generation successful');
        return secret;
    } catch (error) {
        console.log('2FA secret generation error: ', error);
        throw error;
    }
}

async function generateAppOtpData(user, secret) {
    console.log('Generating otp data...');

    const appName = 'Author Website Admin Portal';
    const otpAuth = authenticator.keyuri(user.email, appName, secret);
    const qrImageUrl = await qrcode.toDataURL(otpAuth);

    const qrInfo = {
        otpauthUrl: otpAuth,
        qrCodeDataUrl: qrImageUrl,
    };
    return qrInfo;
}

// TEMP Archive --------------------------

// generateMfaSecret: async (req, res) => {
// const user = await User.findById(req.user.id);

// Check mfa enabled status - don't generate if already set up
// TODO(?): Add "if mfaEnabled && mfaAppSecret", and send along the existing app secret?
// (Any reason not to make the already-generated secret available on request?)
// if (user.mfaEnabled && user.mfaAppSecret) {
//     return res.status(400).json({
//         message: '2FA already verified and enabled',
//         mfaEnabled: user.mfaEnabled,
//     });
// }

// const secret = authenticator.generateSecret();
// user.mfaAppSecret = secret;
// user.save();
// const appName = 'Author Website Admin Portal';

// TODO: Check if way to offer the otpauth code as copy-paste option (if qrcode doesn't work)?
//     return res.json({
//         message: '2FA secret generation successful',
//         secret: secret,
//         qrImageDataUrl: await qrcode.toDataURL(
//             authenticator.keyuri(req.user.email, appName, secret)
//         ),
//         mfaEnabled: user.mfaEnabled,
//     });
// },

// verifyOTP: async (req, res) => {
//     const user = await User.findOne({ email: req.user.email });

//     // TODO: Check - Like with ^generateMfa, is the following necessary as-is? What if they need to register new app?
//     // if (user.mfaEnabled) {
//     //     return res.json({
//     //         message: '2FA already verified and enabled',
//     //         mfaEnabled: user.mfaEnabled,
//     //     });
//     // }

//     const otpCode = req.body.code.replaceAll(' ', ''); //--> TODO: replace with express-validator middleware
//     const isValid = authenticator.check(otpCode, user.mfaAppSecret);
//     if (!isValid) {
//         return res.status(401).json({
//             message: 'OTP verification failed: Invalid code',
//             // mfaEnabled: user.mfaEnabled,
//         });
//     }

//     // Code is valid -- Update user
//     user.mfaMethods.authApp.verified = true;
//     user.save();

//     return res.json({
//         message: 'OTP verification successful',
//         // mfaEnabled: user.mfaEnabled,
//     });
// },
