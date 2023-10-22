import { contactEmailTemplate } from '../utils/emailTemplates.js';
import sendEmail from '../utils/sendEmail.js';

function contactFormController(req, res) {
    const { email, name, message } = req.data;

    const mailDetails = {
        from: `"Post Service" <${process.env.GMAIL_USER}>`,
        to: `${process.env.GMAIL_USER}`,
        replyTo: email,
        subject: `New contact form response, from: ${name}`,
        html: contactEmailTemplate(req.data),
        text: `New message from ${name} (${email}): \n\n` + message,
    };

    try {
        sendEmail(mailDetails);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ error: `Error: \n${error}` });
    }
}

export default contactFormController;
