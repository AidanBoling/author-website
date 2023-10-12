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
        let data = req.body;
        console.log(data);
        try {
            console.log('email: ', email);
            const user = await User.findOne({ email: data.email });

            if (!user) {
                console.log('Invalid email');
                return done(null, false, {
                    message: 'Invalid email',
                });
            }

            const isValid = await argon2.verify(user.password, password);

            if (!isValid) {
                console.log('Invalid password');
                return done(null, false, {
                    message: 'Invalid password',
                });
            }

            return done(null, user, { message: 'Logged in successfully' });
        } catch (error) {
            console.log(error);
            return done(error);
        }
    },
};
// Passport verify password middleware configure
