import Token from '../model/Token.js';

export async function generateTokenLink(purpose, userId) {
    // Check if user has existing reset token, delete if found
    let token = await Token.findOne({ userId: userId });
    if (token) {
        await token.deleteOne(); //<-- TODO: Check syntax
    }

    // Save new token in DB (hashed before save)
    token = await new Token({
        userId: user._id,
        // token: resetToken,
    }).save();

    // Create password reset link
    const link = `${process.env.CLIENT_URL}/admin#/${purpose}?token=${token}&id=${user._id}`;
    console.log(link);

    return link;
}
