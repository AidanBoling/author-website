function contactEmailTemplate(data) {
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

export default contactEmailTemplate;
