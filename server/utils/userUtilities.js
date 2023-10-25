import Token from '../model/Token.js';
import { randomBytes, randomInt } from 'node:crypto';
import EmailOTP from '../model/emailOTP.js';

export async function generateTokenLink(purpose, userId) {
    // Check if user has existing reset or registration token, delete if found
    // (Only one token at a time per user possible)
    let oldToken = await Token.findOne({ userId: userId });
    if (oldToken) {
        console.log('Old token found! Deleting...');
        await oldToken.deleteOne(); //<-- TODO: Check syntax
    }

    // Generate new random token
    const token = randomBytes(50).toString('hex');
    console.log('Token: ', token); // For testing only
    console.log('Id: ', userId); // For testing only

    // Save new token in DB (hashed before save)
    await new Token({
        userId: userId,
        tokenValue: token,
        purpose: purpose,
    }).save();

    // Create access link
    const link = `${process.env.CLIENT_URL}/admin#/${purpose}?token=${token}&id=${userId}`;
    console.log(link);

    return link;
}

export async function generateEmailOtpCode(userId) {
    // Check if user has existing reset or registration token, delete if found
    // (Only one token at a time per user possible)
    let oldCode = await EmailOTP.findOne({ userId: userId });
    if (oldCode) {
        console.log('Existing OTP code found! Deleting...');
        await oldCode.deleteOne(); //<-- TODO: Check syntax
    }

    const otpCode = parseInt(randomBytes(3).toString('hex'), 16)
        .toString()
        .substring(0, 6);

    // const generateOTP = () =>
    //     new Promise(res =>
    //         randomBytes(3, (err, buffer) => {
    //             res(
    //                 parseInt(buffer.toString('hex'), 16)
    //                     .toString()
    //                     .substring(0, 6)
    //             );
    //         })
    //     );

    // const otpCode = await generateOTP();

    // Generate new random 6-digit code
    // const otpCode = randomInt(100000, 1000000, (err, n) => {
    //     if (err) throw err;
    //     console.log('6-digit otp code: ', n); // For testing only
    // });

    console.log('6-digit otp code: ', otpCode); // For testing only
    console.log('UID: ', userId); // For testing only

    // Save new token in DB (hashed before save)
    await new EmailOTP({
        userId: userId,
        value: otpCode,
    }).save();

    return otpCode;
}
