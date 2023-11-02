import { ExpressValidator } from 'express-validator';

// const parseJSON = value => JSON.parse(value);

const arrayItemsAreInt = array => {
    array.forEach(item => {
        if (typeof item === 'number') {
            return true;
        } else {
            throw new Error('Array items must be numbers');
        }
    });
    return true;
};

const arrayItemsAreAlphanumStr = array => {
    array.forEach(item => {
        if (typeof item === 'string' && item.match(/^[a-zA-Z0-9]+$/)) {
            return true;
        } else {
            throw new Error(
                'One or more items in array are not alphanumeric string'
            );
        }
    });
    return true;
};

const sortOrderIsValid = array => {
    const sortOrder = array[1].toLowerCase();
    if (sortOrder === 'asc' || sortOrder === 'desc') return true;
    throw new Error('Sort order is not valid');
};

const confirmationPasswordMatches = (value, { req }) => {
    return value === req.body.password;
};

// TODO:
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
        // Or just use isMongoId ??
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

    adminQuery: {
        id: { isArray: true },

        range: {
            in: ['query'],
            isArray: { options: { max: 2 } },
            custom: { options: arrayItemsAreInt },
            exists: true,
        },

        sort: {
            in: ['query'],
            isArray: { options: { max: 2 } },
            custom: { options: arrayItemsAreAlphanumStr },
        },
        // or do each individual... sort[0]: {isAlpha: true}, etc??

        published: { in: ['query'], isBoolean: true },

        q: { in: ['query'], isString: true, isAlphanumeric: true },
        name: { in: ['query'] },
    },

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
        trim: true,
        isIn: { options: [['register', 'passwordReset']] },
    },

    method: {
        in: ['body'],
        trim: true,
        isIn: { options: [['authApp', 'email']] },
    },

    email: {
        errorMessage: 'Not a valid email',
        in: ['body'],
        trim: true,
        isLength: {
            options: { min: 6, max: 64 },
        },
        isEmail: {
            options: {
                blacklisted_chars: '<>\'"()=\\/&%$^',
                allow_ip_domain: false,
            },
        },
        // trim/get rid of whitespaces...
        // to lowercase...
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

    textShort: {
        in: ['body'],
        trim: true,
        isLength: {
            options: { max: 64 },
            errorMessage: 'Name is too long',
        },
        // remove/replace: ^±!@£$%^&*_+§€#¢§¶•ªº«\\/<>?:;|=.,
        // and/or just escape?
        // should be escaped?
    },

    // textLong: {
    //     trim: true,
    //     // isString?
    // },

    // jwtHeader: {
    //             in: ['headers'],
    //     // exists: true,
    //     isJWT: true

    //     // ...
    // },

    // sessionCookie: { in: ['cookies'] },
};

// isHash('SHA256'):
