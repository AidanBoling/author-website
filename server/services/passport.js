import argon2 from 'argon2';
import User from '../model/User.js';

export const passportStrategy = {
    // loginOLD:

    // async function verify(email, password, cb) {
    //     try {
    //         let user = await User.findOne({ email: email });
    //         if (!user) {
    //             return cb(null, false, {
    //                 message: 'Incorrect username or password.',
    //             });
    //         }

    //         const isValid = await user.verifyPassword(password);

    //         // Note: -> If user model hash doesn't work, put hash function here

    //         if (!isValid) {
    //             return cb(null, false, {
    //                 message: 'Incorrect username or password.',
    //             });
    //         }
    //     } catch (error) {}
    //     return cb(error);
    // },

    login: async (req, email, password, done) => {
        // let data = req.body;
        const valEmail = req.body.email;
        const valPassword = req.body.password;

        // [-] TODO: Refactor for security --> should take ~same time if user not in system as when user is
        // So either do hashing of attempted password first, then search user, then compare emails
        // Or, figure out some way to normalize the time, like a timer...?, so always takes same time...
        // --> Update: Changed to hash a dummy password if user not found. CHECK to see if any security reasons not to do this.

        // console.log(data);

        try {
            console.log('email: ', valEmail);
            console.log('password: ', valPassword);

            const user = await User.authenticate(valEmail, valPassword);

            if (user)
                return done(null, user, { message: 'Logged in successfully' });

            return done(null, false, { message: 'Invalid email or password' });
        } catch (error) {
            console.log(error);
            return done(error);
        }
    },

    loginJwt: async (payload, done) => {
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
};
// Passport verify password middleware configure
