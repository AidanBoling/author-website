import mongoose from 'mongoose';
import argon2 from 'argon2';

const { Schema, SchemaTypes, model } = mongoose;

const emailOTPSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        immutable: true,
    },
    value: {
        type: String,
        required: true,
        immutable: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        expires: 600, // in seconds, = 10 minutes
        immutable: true,
    },
});

emailOTPSchema.pre('save', async function (next) {
    if (!this.isModified('value')) {
        return next();
    }

    try {
        const hash = await argon2.hash(this.value, {
            memoryCost: 2 ** 14,
            parallelism: 3,
        });
        this.value = hash;
        next();
    } catch (error) {
        console.log('Error hashing otp code: ', error.message);
    }
});

emailOTPSchema.static('verifyEmailOTP', async (userId, OTPcode) => {
    // Check for existing code from verified userID
    const foundOTP = await EmailOTP.findOne({
        userId: userId,
    });

    // if (!foundOTP) {
    //     // // Hash dummy password (so takes ~same time as valid code
    //     // await argon2.hash(process.env.DUMMY_PWD, {
    //     //     memoryCost: 2 ** 14,
    //     //     parallelism: 3,
    //     // });
    //     console.log('No emailOTP found for user: code invalid or expired');
    // }

    // Compare received code value with found db code
    if (foundOTP && (await argon2.verify(foundOTP.value, OTPcode))) return true;

    console.log('Code invalid or expired');
    return false;
});

const EmailOTP = model('emailOTP', emailOTPSchema);
export default EmailOTP;
