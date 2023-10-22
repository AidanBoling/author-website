export function contactEmailTemplate(data) {
    const body = data.messageArray
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
    // console.log(body);

    const emailContent = `<p>You've received a new message from your Contact form. </p>
        <ul>
            <li><b>Name</b>: ${data.name}</li>
            <li><b>Email</b>: ${data.email}</li>
        </ul>
        <p><b>Message:</b></p>
        ${body}`;

    return emailContent;
}

export const userEmailTemplates = {
    passwordReset: (data, variant) => {
        let content;

        if (variant === 'request') {
            content = {
                subject: 'Password Reset Request',
                html: `<p>Follow the link below to reset your PlanetGoatPress account password:</p>
                    <a href=${data.link}>Reset Password</a>
                    <br /><br />
                    <p><b>Important:</b> If you did not initiate this request, DO NOT CLICK THE LINK. Report this email to your admin.</p>`,
                text: `Use the below link (copy-paste into your browser) to reset your PlanetGoatPress account password: \n\n
                    ${data.link}\n\n\n
                    Important: If you did not initiate this request, DO NOT CLICK THE LINK. Report this email to your website sys admin.`,
            };
        } else if (variant === 'success') {
            content = {
                subject: 'Password Reset Confirmation',
                html: `<p>${data.name},</p><br /><p>Your PlanetGoatPress password has been reset successfully.</p>
            <a href="${process.env.CLIENT_URL}
            /admin#/login">Admin Portal Login</a>`,
                text: `${data.name},\n\nYour PlanetGoatPress password has been reset successfully.`,
            };
        }

        return content;
    },

    register: (data, variant) => {
        let content;

        if (variant === 'request') {
            content = {
                subject: 'PlanetGoatPress registration instructions',
                html: `<p>Your registration code was accepted. Follow link below to complete your PlanetGoatPress account registration:</p>
                    <a href=${data.link}>Complete Registration</a>`,
                text:
                    `Your registration code was accepted. Use the link below to complete your PlanetGoatPress account registration: \n\n` +
                    data.link,
            };
        } else if (variant === 'success') {
            content = {
                subject: 'PlanetGoatPress registration confirmation',
                html: `<p>Welcome, ${data.name}!</p>
                    <br />
                    <p>You have successfully set up your PlanetGoatPress user account.
                   Link to the login page:</p>
                    
                    <a href="${process.env.CLIENT_URL}
                    /admin#/login">Admin Portal Login</a>`,
                text:
                    `Welcome, ${data.name}!\n\n
                    You have successfully set up your PlanetGoatPress user account.
                    The link below will take you to the login:\n\n` +
                    process.env.CLIENT_URL +
                    '/admin#/login',
            };
        }

        return content;
    },
};
