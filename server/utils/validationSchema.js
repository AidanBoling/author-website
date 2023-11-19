// import { ExpressValidator } from 'express-validator';

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

// TODO: custom validator that calls a function from tags
// to return all tag ids, and use that list to validate "tags" value

// const sortOrderIsValid = array => {
//     const sortOrder = array[1].toLowerCase();
//     if (sortOrder === 'asc' || sortOrder === 'desc') return true;
//     throw new Error('Sort order is not valid');
// };

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
            in: ['params', 'query'],
            toInt: true,
            isNumeric: true,
            isLength: {
                options: { max: 3 },
            },
        },

        limit: {
            in: ['params', 'query'],
            isIn: { options: [['2', '5', '10', '20', '30']] },
        },

        category: {
            in: ['params', 'query'],
            isIn: { options: [['fiction', 'non-fiction']] },
        },

        tags: {
            in: ['params', 'query'],
            isArray: true,
            custom: { options: arrayItemsAreAlphanumStr },
            //     isIn: { options: [['', '']] },
        },
    },

    adminQuery: {
        id: {
            in: ['query'],
            isArray: true,
        },

        range: {
            in: ['query'],
            isArray: { options: { max: 2 } },
            custom: { options: arrayItemsAreInt },
        },

        sort: {
            in: ['query'],
            isArray: { options: { max: 2 } },
            custom: { options: arrayItemsAreAlphanumStr },
        },

        published: { in: ['query'], isBoolean: true },

        q: { in: ['query'], isString: true, isAlphanumeric: true },

        name: {
            in: ['query'],
            isString: true,
        },

        group: {
            in: ['query'],
            isArray: true,
            custom: { options: arrayItemsAreAlphanumStr },
        },

        tags: {
            in: ['query'],
            isArray: true,
            custom: { options: arrayItemsAreAlphanumStr },
        },
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
        isLength: {
            options: { min: 6, max: 6 },
        },
        isNumeric: { options: { no_symbols: true } },
        // ...remove whitespace...
    },

    token: {
        in: ['body'],
        trim: true,
        isLength: {
            options: { min: 50, max: 150 },
        },
        isHexadecimal: true,
        // isByteLength: {
        //     options: { min: 50, max: 64 },
        // },
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
        isString: true,
        isLength: {
            options: { min: 6, max: 64 },
        },
        isEmail: {
            options: {
                blacklisted_chars: '<>\'"(){}=\\/&%$^',
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
        isString: true,
        isLength: {
            options: { min: 12, max: 64 },
            errorMessage: 'Password must at least 12 characters',
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
        isString: true,
        isLength: {
            options: { max: 64 },
            errorMessage: 'Field is too long',
        },
        // remove/replace: ^±!@£$%&*_+§€#¢§¶•ªº«\\/<>?:;|=.,
    },

    textMedium: {
        in: ['body'],
        trim: true,
        isString: true,
        isLength: {
            options: { max: 100 },
            errorMessage: 'Field is too long',
        },
        // remove/replace??: ^$*_§€#§¶\\/<>:;|=.,
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
