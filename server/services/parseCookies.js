import { getFingerprintHash } from '../utils/authUtilities.js';

export default function processCookies(req, res, next) {
    // Cookies that have not been signed
    if (Object.keys(req.cookies).length) {
        console.log('Cookies: ', req.cookies);
        let returnedFingerprint = null;

        if (req.cookies.Fpt) {
            returnedFingerprint = req.cookies.Fpt;
        }
        req.cookies.Fpt = getFingerprintHash(returnedFingerprint);
    }

    // Cookies that have been signed
    if (Object.keys(req.signedCookies).length) {
        console.log('Signed Cookies: ', req.signedCookies);
    }
    next();
    // next();
}
