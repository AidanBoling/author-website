import { contactEmailTemplate } from '../utils/emailTemplates.js';
import sendEmail from '../utils/sendEmail.js';

function contactFormController(req, res) {
    let { email, name, messageClean } = req.data;
    const message = req.body.message;

    const subjectLineEnd = name ? `, from: ${name}` : '';
    const textSenderDetails = name
        ? `${name} (${email})`
        : `${email} (name not given)`;

    name = name || '(Name not given)';

    const mailDetails = {
        from: `"Post Service" <${process.env.GMAIL_USER}>`,
        to: `${process.env.GMAIL_USER}`,
        replyTo: email,
        subject: 'New contact form response' + subjectLineEnd,
        html: contactEmailTemplate({ email, name, messageClean }),
        text:
            `You've received a message from ${textSenderDetails}: \n\n\n` +
            message,
    };

    try {
        sendEmail(mailDetails);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ error: `Error: \n${error}` });
    }
}

export default contactFormController;
