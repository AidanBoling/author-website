import jwt from 'jsonwebtoken';
import { randomBytes, createHmac } from 'node:crypto';
const isDev = process.env.NODE_ENV !== 'production';
// Since localhost is not having https protocol,
// secure cookies do not work correctly (in postman)

export const FPT_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !isDev,
    maxAge: process.env.FPNT_COOKIE_MAX_AGE,
    sameSite: 'Strict',
};

export function getFingerprint() {
    const fingerprint = randomBytes(50).toString('hex');
    console.log(`Fingerprint: ${fingerprint}`);
    // fingerprint = fingerprint.toString('hex');

    return fingerprint;
}

export function getFingerprintHash(fingerprint) {
    const hash = createHmac('SHA256', fingerprint).digest('hex');
    console.log('Fingerprint hash: ', hash);
    return hash;
}

export function getAuthToken(user, userFingerprintHash) {
    const payload = {
        user: { email: user.email },
        fingerprint: userFingerprintHash,
    };
    const options = {
        algorithm: process.env.JWT_ALG,
        issuer: process.env.JWT_ISS,
        audience: process.env.JWT_AUTH_AUD,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function getMFALoginToken(user) {
    // Payload must be *different* from final authentication token
    // (which is given once correct 2nd factor code received).
    const payload = {
        loginPasswordVerified: { email: user.email },
    };
    const options = {
        algorithm: process.env.JWT_ALG,
        issuer: process.env.JWT_ISS,
        audience: process.env.JWT_MFA_AUD,
        expiresIn: '5m',
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}
