import sanitizeHtml from 'sanitize-html';
import { matchedData } from 'express-validator';

const sanitizeOptionsNoHTML = { allowedTags: [], allowedAttributes: {} };
const sanitizeOptionsEscapeAll = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'recursiveEscape',
};

export function sanitizeContactFormInput(req, res, next) {
    const valData = matchedData(req);
    const data = {
        name: sanitizeHtml(valData.name, sanitizeOptionsNoHTML),
        // sanitizeHtml(req.body.fName, sanitizeOptionsNoHTML) +
        // ' ' +
        // sanitizeHtml(req.body.lName, sanitizeOptionsNoHTML),
        email: sanitizeHtml(valData.email, sanitizeOptionsEscapeAll),
        messageClean: sanitizeHtml(req.body.message, sanitizeOptionsNoHTML),
    };

    console.log(data);

    // Note, currently only sending messages as plaintext, so messageArray not used atm
    req.data = data;
    next();
}

export function sanitizeSubscribeFormInput(req, res, next) {
    console.log('Email subscriber (unvalidated) input: ', req.body);

    const { email } = matchedData(req);

    const subscriber = {
        firstName: sanitizeHtml(req.body.fName, sanitizeOptionsNoHTML),
        lastName: sanitizeHtml(req.body.lName, sanitizeOptionsNoHTML),
        email: sanitizeHtml(email, sanitizeOptionsNoHTML),
    };

    req.subscriber = subscriber;
    next();
}
