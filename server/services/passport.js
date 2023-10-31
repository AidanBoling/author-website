// import argon2 from 'argon2';
import User from '../model/User.js';
import { matchedData } from 'express-validator';

export const passportStrategy = {
    login: async (req, email, password, done) => {
        const data = matchedData(req);

        // [-] TODO: Refactor for security --> should take ~same time if user not in system as when user is
        // So either do hashing of attempted password first, then search user, then compare emails
        // Or, figure out some way to normalize the time, like a timer...?, so always takes same time...
        // --> Update: Changed to hash a dummy password if user not found.
        // CHECK to see if any security reasons not to do this.

        try {
            console.log('Starting passport login strategy...');
            console.log('email: ', data.email);
            // console.log('password: ', valPassword);

            const user = await User.authenticate(data.email, data.password);

            if (user)
                return done(null, user, { message: 'Logged in successfully' });

            return done(null, false, { message: 'Invalid email or password' });
        } catch (error) {
            console.log(error);
            return done(error);
        }
    },

    loginJwt: async (payload, done) => {
        console.log('Checking JWT token...');
        console.log('Token: ', payload);
        try {
            const user = await User.findOne({
                email: payload.loginPasswordVerified?.email,
            });
            return done(null, user);
        } catch (error) {
            console.log(error.message);
            return done(error);
        }
    },
};
// Passport verify password middleware configure

//
//
// TEMP Archive -----------------------
//

// from login... :
// console.log(data);

//check for existing cookie name "id" -

// Clear out any existing sessions
// console.log('Cleaning old sessions');
// try {
//     if (req.isAuthenticated()) {
//         console.log(
//             'Session is authenticated: ',
//             req.isAuthenticated()
//         );
//         console.log('Session found at login: ', req.sessionID);
//         // console.log('Session: ', req.session);

//         console.log('Logging out user found in session');
//         req.logout();
//     }
// } catch (err) {
//     console.log(err);
// }

//
//
// jwt: async (req, payload, done) => {
//     console.log('Jwt fingerprint: ', payload.fingerprint);
//     const fingerprintVerified =
//         payload.fingerprint && payload.fingerprint === req.cookies.Fpt;

//     if (!fingerprintVerified) return done(null, false);

//     try {
//         const user = await User.findOne({ email: payload.user?.email });

//         return done(null, {
//             // name: user.name,
//             email: user.email,
//             mfaEnabled: user.mfaEnabled,
//         });
//     } catch (error) {
//         return done(error);
//     }
// },
