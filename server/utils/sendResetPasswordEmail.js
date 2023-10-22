import { transporter } from './nodemailerTransporter.js';

const emailTemplates = {
    passwordReset: (data, option) => {
        let content;

        if (option === 'request') {
            content = {
                subject: 'Password Reset Request',
                html:
                    `<p>Follow the link below to reset your PlanetGoatPress account password:</p>
        <br />` + data.link,
                text:
                    `Follow the link below to reset your PlanetGoatPress account password: \n\n` +
                    data.link,
            };
        } else if (option === 'success') {
            content = {
                subject: 'Password Reset Confirmation',
                html:
                    `<p>${data.name},</p><br /><p>Your PlanetGoatPress password has been reset successfully.</p>
            <br />` + link,
                text: `${data.name},\n\nYour PlanetGoatPress password has been reset successfully.`,
            };
        }

        return content;
    },
};

// Rename to: sendAccountInfoEmail(data, email, option)
export default function sendAccountInfoEmail(data, email, purpose, variant) {
    let emailContent;

    if (purpose === 'passwordReset') {
        emailContent = emailTemplates.passwordReset(data, variant);
    }

    const mailDetails = {
        from: `"PlanetGoatPress No-Reply" <${process.env.GMAIL_USER}>`,
        to: email,
        ...emailContent,
    };

    transporter.sendMail(mailDetails, (err, info) => {
        if (err) {
            return err;
        } else {
            console.log('Email sent successfully');
            console.log('SMTP response: \n', info.response);
        }
    });
}
