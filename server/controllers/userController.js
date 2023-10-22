import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import User from '../model/User.js';
import Token from '../model/Token.js';
import sendAccountInfoEmail from '../utils/sendAccountInfoEmail.js';
import { generateTokenLink } from '../utils/userUtilities.js';
import sanitizeHtml from 'sanitize-html'; // --> express-validator? --> Yes
// import crypt...?

const sanitizeOptionsNoHTML = { allowedTags: [], allowedAttributes: {} };

export const userController = {
    // Used to handle (admin-created) codes. Initiates registration and password reset process.
    // TODO: input is an alphanumeric code -> validate & sanitize with middleware first
    // TODO: then check code with custom middleware (verify.accessCode)

    accessRequest: async (req, res) => {
        const emailRecipient = process.env.TEST_EMAIL_RECIPIENT; // FOR TESTING only

        try {
            const link = await generateTokenLink(req.codePurpose, req.user._id);

            //TODO: Check error handling for email -- what error to send back? What response to user?
            if (
                req.codePurpose === 'passwordReset' ||
                req.codePurpose === 'register'
            ) {
                sendAccountInfoEmail(
                    { link: link },
                    emailRecipient, // for TESTING only. Change to --> req.user.email
                    req.codePurpose,
                    'request'
                );
                res.json({
                    message: `Success - email for ${req.codePurpose} should have been sent`,
                });
            } else {
                throw new Error('Invalid purpose');
            }

            // res.json({ message: 'Success' });
        } catch (error) {
            if (error.message === 'Invalid purpose') {
                res.status(401).json({ error: 'Invalid' });
            } else {
                console.log(`Error with ${req.codePurpose} request: `, error);
                res.status(500).json({ error: 'Error' });
            }
        }
    },

    // Final route taken when user updates their info via approved account registration
    // TODO: Preceded by validation middleware, then
    // TODO: Preceded by dedicated custom middleware (verify.userUpdateToken) to verify token valid, and that
    // the user linked to the token matches the email submitted by the user.

    completeAccountSetup: async (req, res) => {
        try {
            const user = await User.verifyIdEmailMatch(
                req.data.id,
                req.data.email
            );
            if (!user) {
                throw new Error('Invalid');
            }

            // Update user's information, only if user doesn't yet have password set
            if (!user.password) {
                // user.name = ...
                // user.password = ...
                user.password = data.password;
                // [...]
                user.markModified('password'); // this triggers it to be hashed on save()
                user = await user.save();

                // TODO: Delete temp registration code

                res.status(200).json({
                    message: 'Account registration completed',
                });
                // Note: on front end - have this page redirect them to login page.

                // TODO: Send email notifying of account created
            } else {
                console.log(
                    "User's password already set; use reset password process instead."
                );
                throw new Error('User already registered');
            }
        } catch (error) {
            console.log('Error with account setup: ', error);
            res.status(500).json({
                message: 'Error registering account. Contact your admin',
            });
        }

        // Delete email token (whether setup is sucessful or not)
        // TODO: Check syntax
        await req.token
            .deleteOne()
            .catch(() =>
                console.log('There was an error in deleting the access token!')
            );
    },

    // Processes password reset submission
    // TODO: preceded by validation and sanitization middleware (for email, and for password (min/max length, other security requirements, and that password entries match),
    // TODO: preceded by dedicated custom middleware to validate token (verify.userUpdateToken)
    passwordReset: async (req, res) => {
        const emailRecipient = process.env.TEST_EMAIL_RECIPIENT; // FOR TESTING only

        let status;
        try {
            // // Additional auth check: check submitted userId matches
            // the email submitted. If match, returns user
            const user = await User.verifyIdEmailMatch(
                req.params.id,
                req.body.email
            );
            if (!user) {
                throw new Error('Invalid');
            }

            // Update user's password
            if (user.password) {
                user.password = data.password;
                user.markModified('password');
                user = await user.save();

                // console.log(user); // <-- check that password is hashed
                res.json({
                    email: user.email,
                    message: 'Password reset successfully',
                });

                sendAccountInfoEmail(
                    { name: user.name },
                    emailRecipient, // for TESTING only. Change to --> user.email
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
                message: 'Error resetting password. Contact your admin',
            });
        }

        // Delete email token (whether reset is sucessful or not)
        // TODO: Check syntax
        await req.token
            .deleteOne()
            .catch(() =>
                console.log('There was an error in deleting the access token!')
            );
    },

    enableMfa: async (req, res) => {
        /*...*/
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

        // TODO: Check - Like with ^generateMfa, is the following necessary as-is? What if they need to register new app?
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
