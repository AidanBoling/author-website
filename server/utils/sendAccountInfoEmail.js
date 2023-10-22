import { userEmailTemplates } from './emailTemplates.js';
import sendEmail from './sendEmail.js';

export default function sendAccountInfoEmail(data, email, purpose, variant) {
    console.log('Starting email prep...');
    let emailContent;

    if (purpose === 'passwordReset') {
        emailContent = userEmailTemplates.passwordReset(data, variant);
    }
    if (purpose === 'register') {
        emailContent = userEmailTemplates.register(data, variant);
    }

    const mailDetails = {
        from: `"PlanetGoatPress No-Reply" <${process.env.GMAIL_USER}>`,
        to: email,
        ...emailContent,
    };

    if (!email) throw new Error('Invalid recipient');
    console.log('Mail details: ', mailDetails);

    sendEmail(mailDetails);
}
