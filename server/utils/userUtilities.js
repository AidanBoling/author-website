import Token from '../model/Token.js';
import { randomBytes } from 'node:crypto';

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
