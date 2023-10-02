import contactEmailTemplate from '../utils/contactFormEmailTemplate.js';

function contactFormController(data, mailDetailsInvariable, transporter, res) {
    const mailDetails = {
        ...mailDetailsInvariable,
        replyTo: data.email,
        subject: `New contact form response, from: ${data.name}`,
        html: contactEmailTemplate(data),
        text:
            `New message from ${data.name} (${data.email}): \n\n` +
            data.message,
    };

    transporter.sendMail(mailDetails, (err, info) => {
        if (err) {
            console.log('Error: ', err);
            res.status(500).json({ error: `Error: \n${err}` });
        } else {
            console.log('Email sent successfully');
            console.log('SMTP response: \n', info.response);
            res.status(200).json({ message: 'Success' });
        }
    });
}

export default contactFormController;
