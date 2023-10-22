import nodemailer from 'nodemailer';

export default function sendEmail(mailDetails) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    transporter.sendMail(mailDetails, (err, info) => {
        if (err) {
            console.log('Error sending email: ', err);
            throw err;
        } else {
            console.log('Email sent successfully');
            console.log('SMTP response: \n', info.response);
        }
    });
}
