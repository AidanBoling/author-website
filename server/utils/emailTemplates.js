export function contactEmailTemplate(data) {
    const messageArray = data.message.split(/\n+/);
    const body = messageArray.map(paragraph => `<p>${paragraph}</p>`).join('');
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

// TODO: Update Password Reset template with info about link expiration.
export const userEmailTemplates = {
    register: (data, variant) => {
        const company = process.env.COMPANY_NAME;
        let content;

        if (variant === 'request') {
            content = {
                subject: `${company} registration instructions`,
                html: `<p>Your registration code was accepted. Follow the link below to complete your ${company} account registration:</p>
                    <a href=${data.link}>Complete Registration</a>
                    <p>Note: This link expires in 15 minutes. After that, you'll need to use your access code to generate another link.</p>`,
                text: `Your registration code was accepted. Use the link below to complete your ${company} account registration: \n\n
                    ${data.link}\n\n\n
                    Note: This link expires in 15 minutes. After that, you'll need to use your access code to generate another link.`,
            };
        } else if (variant === 'success') {
            content = {
                subject: `${company} registration confirmation`,
                html: `<p>Welcome, ${data.name}!</p>
                    <p>You have successfully set up your ${company} user account.
                   Here's the link to the login page:</p>
                    <p><a href="${process.env.CLIENT_URL}/admin#/login">Admin Portal Login</a></p>`,
                text: `Welcome, ${data.name}!\n\n
                    You have successfully set up your ${company} user account.
                    The link below will take you to the login page:\n\n
                    ${process.env.CLIENT_URL}/admin#/login`,
            };
        }

        return content;
    },

    passwordReset: (data, variant) => {
        const company = process.env.COMPANY_NAME;
        let content;

        if (variant === 'request') {
            content = {
                subject: `${company} Password Reset Request`,
                html: `<p>Follow the link below to reset your ${company} account password:</p>
                    <a href=${data.link}>Reset Password</a>
                    <br /><br />
                    <p><b>Important:</b> If you did not initiate this request, DO NOT CLICK THE LINK. Report this email to your admin.</p>`,
                text: `Use the below link (copy-paste into your browser) to reset your ${company} account password: \n\n
                    ${data.link}\n\n\n
                    Important: If you did not initiate this request, DO NOT CLICK THE LINK. Report this email to your website sys admin.`,
            };
        } else if (variant === 'success') {
            content = {
                subject: `${company} Password Reset Confirmation`,
                html: `<p>${data.name},</p>
                    <p>Your ${company} password has been reset successfully. Link to the login page:</p>
                    <p><a href="${process.env.CLIENT_URL}/admin#/login">${company} Admin Portal</a></p><br />
                    <p><b>Important:</b> If you did not initiate this change, report this immediately to your website sys admin.</p>`,
                text: `${data.name},\n\n
                    Your ${company} password has been reset successfully.\n\n\n
                    Important: If you did not initiate this change, report this immediately to your website sys admin.`,
            };
        }

        return content;
    },

    passwordChange: data => {
        const company = process.env.COMPANY_NAME;

        const content = {
            subject: `${company} Password Change Confirmation`,
            html: `<p>${data.name},</p>
                    <p>Your ${company} password has been changed successfully. Link to the login page:</p>
                    <p><a href="${process.env.CLIENT_URL}/admin#/login">${company} Admin Portal</a></p><br />
                    <p><b>Important:</b> If you did not make this change, report this immediately to your website sys admin.</p>`,
            text: `${data.name},\n\n
                    Your ${company} password has been reset successfully.\n\n\n
                    Important: If you did not make this change, report this immediately to your website sys admin.`,
        };

        return content;
    },

    otpCode: code => {
        const company = process.env.COMPANY_NAME;

        const content = {
            subject: `${company} Verification Code`,
            html: `<p>Your login verification code is <b>${code}</b>. This code expires in 10 minutes.</p>`,
            text: `Your login verification code: ${code}\n
                This code expires in 10 minutes.`,
        };

        return content;
    },
};
