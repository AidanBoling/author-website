import User from '../model/User.js';
import Token from '../model/Token.js';
import Code from '../model/Code.js';
import { validationResult, matchedData } from 'express-validator';

export const verify = {
    // Verifies existence of a submitted access code (for password reset or registration).
    // Returns user linked to code.
    // TODO: Preceded by validation middleware.
    accessCode: async (req, res, next) => {
        // CHECK: Need to handle validator invalid results here, or can do within validator middleware?
        const data = matchedData(req); //CHECK variables -- depends on validation output...
        console.log(data);

        // ...Check for code, return purpose and userId
        try {
            const userCode = await Code.findOne({ value: data.code });
            if (!userCode) {
                console.log('Invalid access code entered');
                throw new Error('Invalid');
            }

            const user = await User.findById(userCode.userId);
            if (!userCode) throw new Error('User not found');

            req.user = user;
            req.codePurpose = userCode.purpose;

            return next();
        } catch (error) {
            if (error.message === 'Invalid') {
                res.status(401).json({ message: 'Invalid' });
            } else {
                res.status(500).json({ message: 'Server error' });
            }
        }
    },

    // Verifies token + user match from submission of registration & password reset forms
    // TODO: Preceded by validation middleware (id, token(??), purpose)
    userUpdateToken: async (req, res, next) => {
        // CHECK: Need to handle validator invalid results here, or can do within validator middleware?
        const data = matchedData(req); // CHECK -- need different/separate one for params?
        console.log(data);

        try {
            // Check for existing token by submitted userId and purpose
            const userToken = await Token.findOne({
                userId: data.id,
                purpose: data.purpose,
            });

            if (!userToken) {
                //TODO (??): insert dummy hash (for time-based attacks...)
                console.log('No token linked to given user');
                throw new Error('Invalid');
            }

            // Compare received token value with found db token value
            const isValid = userToken.verifyToken(data.token);
            if (!isValid) {
                throw new Error('Invalid');
            }

            req.data = {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                codePurpose: data.purpose,
            };
            req.token = userToken;

            return next();
        } catch (error) {
            console.log(error);
            if (error.message === 'Invalid') {
                res.status(401).json({ error: 'Invalid or expired token' });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    },
};
