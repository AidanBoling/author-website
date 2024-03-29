import mongoose from 'mongoose';
import argon2 from 'argon2';
import { randomBytes, createHmac } from 'node:crypto';
import User from './User.js';

const { Schema, SchemaTypes, model } = mongoose;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    tokenValue: {
        type: String,
        required: true,
        //immutable: true <-- ???
    },
    purpose: {
        type: String,
        required: true,
        // immutable: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        expires: 3600, // this is the expiry time in seconds
        //immutable: true, // --> ??
    },
});

tokenSchema.pre('save', async function (next) {
    // if (!this.isModified('token')) {
    //     return next();
    // }

    try {
        const hash = await argon2.hash(this.tokenValue, {
            memoryCost: 2 ** 14,
            parallelism: 3,
        });
        this.tokenValue = hash;
        next();
    } catch (error) {
        console.log('Error hashing token: ', error.message);
    }
});

// tokenSchema.methods.verifyToken = async token => {
//     try {
//         const isValid = await argon2.verify(this.tokenValue, token);
//         if (isValid) return true;
//         return false;
//     } catch (error) {
//         console.log(error);
//         // throw error;
//     }
//     return false;
// };

tokenSchema.static('verifyToken', async (userId, tokenPurpose, tokenVal) => {
    // Check for existing token for form-submitted userId and purpose
    const user = await User.findById(userId);
    let userToken;
    if (user) {
        userToken = await Token.findOne({
            userId: user._id,
            purpose: tokenPurpose,
        });
    }

    if (!user) {
        // Q: Is this needed?
        await argon2.hash(process.env.DUMMY_PWD, {
            memoryCost: 2 ** 14,
            parallelism: 3,
        });
        console.log('Invalid user, or no token linked to given user');
    }

    // Compare received token value with found db token value
    if (userToken && (await argon2.verify(userToken.tokenValue, tokenVal)))
        return userToken;

    return false;
});

const Token = model('Token', tokenSchema);
export default Token;
