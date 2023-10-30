const confirmationPasswordMatches = (value, { req }) => {
    return value === req.body.password;
};

export const validationSchema = {
    accessCode: {
        isLength: {
            options: { min: 8, max: 16 },
        },
        isAlphanumeric: { locale: 'en-US' },
        in: ['body'],
    },
    id: {
        exists: true,
        isEmpty: { negated: true },
        isAlphanumeric: { locale: 'en-US' },
        in: ['body'],
    },
    otpCode: {
        exists: true,
        // isEmpty: { negated: true },
        isLength: {
            options: { min: 6, max: 6 },
        },
        isNumeric: { options: { no_symbols: true } },
        in: ['body'],
    },
    token: {
        exists: true,
        isEmpty: { negated: true },
        isAlphanumeric: { locale: 'en-US' },
    },
    purpose: {
        isIn: { options: [['register', 'passwordReset']] },
        in: ['body'],
    },
    method: {
        isIn: { options: [['authApp', 'email']] },
        in: ['body'],
    },
    email: {
        exists: true,
        // isEmpty: { negated: true },
        isEmail: true,
        in: ['body'],
    },
    password: {
        exists: true,
        // isEmpty: { negated: true },
        isLength: {
            options: { min: 8, max: 64 },
            errorMessage: 'Password must at least 8 characters',
        },
        in: ['body'],
    },
    // match the below with the above -- if no match, throw error "Passwords don't match"
    confirmPassword: {
        matchesNewPassword: {
            custom: confirmationPasswordMatches,
            bail: true,
            errorMessage: 'Passwords do not match.',
        },
        in: ['body'],
    },
    name: { in: ['body'] },
};

// const code = req.body.OTPcode.replaceAll(' ', '');
