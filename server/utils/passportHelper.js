import LocalStrategy from 'passport-local';
import User from '../model/User.js';
import { passportStrategy } from '../services/passport.js';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';

export function initializePassport(app, passport) {
    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passReqToCallback: true,
            },
            passportStrategy.login
        )
    );

    passport.use(
        'loginJwt',
        new jwtStrategy(
            {
                algorithms: [process.env.JWT_ALG],
                issuer: process.env.JWT_ISS,
                audience: process.env.JWT_MFA_AUD,
                secretOrKey: process.env.JWT_SECRET,
                jsonWebTokenOptions: { maxAge: '5m' },
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            },
            passportStrategy.loginJwt
        )
    );

    passport.serializeUser((user, done) => {
        // process.nextTick(function() {
        //     return cb(null, {
        //       id: user.id,
        //       email: user.email,
        //     });
        //   });
        done(null, { id: user._id, email: user.email });
    });

    passport.deserializeUser(async (user, done) => {
        // process.nextTick(function() {
        //     return cb(null, user);
        //   });
        try {
            const foundUser = await User.findById(user.id);
            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    });

    app.use(passport.initialize());
    app.use(passport.session());
}
