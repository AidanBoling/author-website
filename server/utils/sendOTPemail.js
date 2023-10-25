import { userEmailTemplates } from './emailTemplates.js';
import sendEmail from './sendEmail.js';
import { generateEmailOtpCode } from './userUtilities.js';

export default async function sendOTPCodeEmail(userId, email) {
    console.log('Starting OTP email prep...');

    const code = await generateEmailOtpCode(userId);

    const emailContent = userEmailTemplates.otpCode(code);

    const mailDetails = {
        from: `"PlanetGoatPress No-Reply" <${process.env.GMAIL_USER}>`,
        to: email,
        ...emailContent,
    };

    if (!email) throw new Error('Missing recipient');
    // console.log('Mail details: ', mailDetails);

    sendEmail(mailDetails);
}
