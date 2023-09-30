// sanitized data goes here
export default function contactEmailTemplate(name, email, bodyParagraphs) {
    const body = bodyParagraphs
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
    // console.log(body);

    const emailContent = `<p>You've received a new message from your Contact form. </p>
        <ul>
            <li><b>Name</b>: ${name}</li>
            <li><b>Email</b>: ${email}</li>
        </ul>
        <p><b>Message:</b></p>
        ${body}`;

    return emailContent;
}
