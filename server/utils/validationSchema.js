const confirmationPasswordMatches = (value, { req }) => {
    return value === req.body.password;
};

export const validationSchema = {
    id: {
        in: ['body', 'params'],
        // exists: true,
        trim: true,
        isLength: {
            options: { min: 22, max: 24 },
        },
        // isAlphanumeric: { locale: 'en-US' },
        isHexadecimal: true,
    },

    resources: {
        page: {
            in: ['params'],
            toInt: true,
            isNumeric: true,
            isLength: {
                options: { max: 3 },
            },
        },

        limit: {
            in: ['params'],
            isIn: { options: [['2', '10', '20', '30']] },
        },

        category: {
            in: ['params'],
            isIn: { options: [['fiction', 'non-fiction']] },
        },
    },
    // tags: {
    //     in: ['params'],
    //     isIn: { options: [['', '']] },
    // },

    accessCode: {
        in: ['body'],
        trim: true,
        isLength: {
            options: { min: 8, max: 16 },
        },
        isAlphanumeric: { locale: 'en-US' },
    },

    otpCode: {
        in: ['body'],
        // exists: true,
        // isEmpty: { negated: true },
        isLength: {
            options: { min: 6, max: 6 },
        },
        isNumeric: { options: { no_symbols: true } },
        // ...remove whitespace...
    },

    token: {
        in: ['body'],
        trim: true,
        // exists: true,
        // isEmpty: { negated: true },
        isByteLength: {
            options: { min: 50, max: 64 },
        },
        isAlphanumeric: { locale: 'en-US' },
    },

    purpose: {
        in: ['body'],
        // exists: true,
        trim: true,
        isIn: { options: [['register', 'passwordReset']] },
    },

    method: {
        in: ['body'],
        // exists: true,
        trim: true,
        isIn: { options: [['authApp', 'email']] },
    },

    email: {
        errorMessage: 'Not a valid email',
        in: ['body'],
        // exists: true,
        trim: true,
        // isEmpty: { negated: true },
        isLength: {
            options: { min: 6, max: 64 },
        },
        isEmail: {
            options: {
                blacklisted_chars: '<>\'"()=\\',
                allow_ip_domain: false,
            },
        },
        // trim/get rid of whitespaces...
    },

    // TODO: increase minimum to 12-14
    password: {
        in: ['body'],
        // exists: true,
        // isEmpty: { negated: true },
        isLength: {
            options: { min: 8, max: 64 },
            errorMessage: 'Password must at least 8 characters',
        },
    },

    // match the below with the above -- if no match, throw error
    confirmPassword: {
        in: ['body'],
        // exists: true,
        matchesNewPassword: {
            custom: confirmationPasswordMatches,
            bail: true,
            errorMessage: 'Passwords do not match.',
        },
    },

    name: {
        in: ['body'],
        // alphanumeric plus... what characters?
        // should be escaped?
    },

    // jwtHeader: {
    //             in: ['headers'],
    //     // exists: true,
    //     isJWT: true

    //     // ...
    // },

    // sessionCookie: { in: ['cookies'] },
};

// isHash('SHA256'):

// isAlpha(locale?: AlphaLocale, options?: {
//     ignore?: string | string[] | RegExp;
//   }): ValidationChain

// isAlphanumeric(locale?: AlphanumericLocale, options?: {
//     ignore?: string | RegExp;
//   }): ValidationChain

//
