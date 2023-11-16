import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mailchimp from '@mailchimp/mailchimp_marketing';
import multer from 'multer';
// import { S3Client } from '@aws-sdk/client-s3';
import { checkSchema } from 'express-validator';
import session from 'express-session';
import passport from 'passport';
import { initializePassport } from './utils/passportHelper.js';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';

import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import Post from './model/Post.js';
import Book from './model/Book.js';
import Article from './model/Article.js';
import Event from './model/Event.js';
import User from './model/User.js';

import postController from './controllers/postController.js';
import bookController from './controllers/bookController.js';
import articleController from './controllers/articleController.js';
import eventController from './controllers/eventController.js';
import imageController from './controllers/imageController.js';
import tagController from './controllers/tagController.js';
import contactFormController from './controllers/contactFormController.js';
import subscribeMailingListController from './controllers/subscribeController.js';

import getFilteredResourceList from './utils/getFilteredResourceList.js';
import getItemByValidatedId from './utils/getItemById.js';
import { handleGetItemsError } from './utils/sharedControllerFunctions.js';
import {
    sanitizeContactFormInput,
    sanitizeSubscribeFormInput,
} from './services/sanitizeFormInput.js';

// import { errorMonitor } from 'events';
// import processCookies from './services/parseCookies.js';
import { userController } from './controllers/userController.js';
import {
    authController,
    passportAuthenticate,
} from './controllers/authController.js';
import { checkAuth, cleanSession } from './services/auth.js';
import { verify } from './services/verifyUserTokens.js';
import { loginTimeCheck } from './services/loginCheck.js';
import { validationSchema } from './utils/validationSchema.js';
import { handleValidationErrors } from './services/validation.js';
import parseQuery from './services/parseAdminQuery.js';

const isDev = process.env.NODE_ENV !== 'production';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const corsOrigin = process.env.CLIENT_URL;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

upload.single('file'); // check this

if (!isDev) {
    app.set('trust proxy', 1);
}

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                'script-src': ["'self'"],
                'style-src': ["'self'", 'https://fonts.googleapis.com'],
                'font-src': ["'self'", 'https://fonts.gstatic.com'],
            },
        },
    })
);

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

// async function pingMC() {
//     const response = await mailchimp.ping.get();
//     console.log(response);
// }
// pingMC();

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.DB}?retryWrites=true&w=majority`
);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
    express.json({
        // limit: 50000
    })
); // limit request size to 50kB TODO
app.use(cookieParser());
app.use(
    cors({
        origin: corsOrigin,
        exposedHeaders: 'Content-Range,X-Total-Count',
        methods: 'GET,POST,PUT,DELETE',
        // allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    })
);

//TODO (later): move session details to separate file
app.use(
    '/admin',
    session({
        name: 'id',
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        rolling: true,
        proxy: !isDev,
        cookie: {
            // domain: isDev ? '.localhost' : null, //Remove in Production
            path: '/',
            httpOnly: true,
            secure: !isDev,
            maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE),
            sameSite: 'Strict',
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
            collectionName: 'sessions',
            // ttl: 7200, // 2 hours
            autoRemove: 'native',
            crypto: { secret: process.env.SESSION_STORE_SECRET },
        }),
    })
);

const BASE = process.env.BASE_API_PATH;

// Checks sessions for user object; if not found, then not authenticated, routing process halted
app.use(BASE + 'admin/auth', passport.session(), checkAuth);
initializePassport(app, passport);

// MAIN APP

app.get(BASE, (req, res) => {
    res.send('<h1>Hello, World</h1>');
});

// -- Posts routes

const listPageValidation = {
    page: validationSchema.resources.page,
    limit: validationSchema.resources.limit,
};

app.get(BASE + 'posts', checkSchema({ ...listPageValidation }), (req, res) => {
    const overrides = { filter: { published: true } };
    const defaultSort = { datePublished: -1 };

    try {
        getFilteredResourceList(Post, req, res, defaultSort, overrides);
    } catch (error) {
        handleGetItemsError(error, res);
    }
});

app.get(
    BASE + 'posts/id/:id',
    checkSchema({ id: validationSchema.id }),
    async (req, res) => {
        try {
            await getItemByValidatedId(Post, req, res);
        } catch (error) {
            handleGetItemsError(error, res);
        }
    }
);

// -- Books routes

app.get(
    BASE + 'books',
    checkSchema({
        ...listPageValidation,
        category: validationSchema.resources.category,
    }),
    async (req, res) => {
        const defaultSort = { datePublished: -1 };

        try {
            getFilteredResourceList(Book, req, res, defaultSort);
        } catch (error) {
            handleGetItemsError(error, res);
        }
    }
);

app.get(
    BASE + 'books/id/:id',
    checkSchema({ id: validationSchema.id }),
    async (req, res) => {
        try {
            await getItemByValidatedId(Book, req, res);
        } catch (error) {
            handleGetItemsError(error, res);
        }
    }
);

// -- Articles routes

app.get(
    BASE + 'articles',
    checkSchema({ ...listPageValidation }),
    (req, res) => {
        const defaultSort = { datePublished: -1 };

        try {
            getFilteredResourceList(Article, req, res, defaultSort);
        } catch (error) {
            handleGetItemsError(error, res);
        }
    }
);

app.get(
    BASE + 'articles/id/:id',
    checkSchema({ id: validationSchema.id }),
    async (req, res) => {
        try {
            await getItemByValidatedId(Article, req, res);
        } catch (error) {
            handleGetItemsError(error, res);
        }
    }
);

// -- Events routes

//TODO: Tweak events resource (here, controller, frontend, etc)
app.get(
    BASE + 'events',
    checkSchema({ ...listPageValidation }),
    async (req, res) => {
        try {
            const allEvents = await Event.find();
            console.log(allEvents);
            res.json(allEvents);
        } catch {
            handleGetItemsError(error, res);
        }
    }
);

// -- Form routes

const mainSiteFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 3 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many submissions, please wait 15 minutes', // TODO: check if/how message shows up to user on contact form
    skipFailedRequests: true, // Don't count 'failed' -- so just prevents spamming emails.
});

app.post(
    BASE + 'form/contact',
    mainSiteFormLimiter,
    checkSchema({
        name: validationSchema.textShort,
        email: validationSchema.email,
    }),
    // TODO: add handleErrors -> kick back to user with error
    sanitizeContactFormInput,
    contactFormController
);

app.post(
    BASE + 'form/subscribe',
    mainSiteFormLimiter,
    checkSchema({ email: validationSchema.email }),
    handleValidationErrors,
    sanitizeSubscribeFormInput,
    subscribeMailingListController
);

//
// ADMIN APP
//

// TODO (?): make sure mongoose to throws error if validation fails for create & update

const adminLimiter = rateLimit({
    windowMs: 1 * 10 * 1000, // 1 minute
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

const adminLimitWarn = rateLimit({
    windowMs: 1 * 10 * 1000, // 1 minute
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        // TODO: Add this to logger...
        console.log(
            '\nRATE LIMIT alert (15r/10s): "/admin" route at ',
            new Date()
        );
        next();
    },
});

app.use(BASE + 'admin', adminLimitWarn, adminLimiter);

// -- POSTS routes

app.use(BASE + 'admin/posts', passport.session(), checkAuth);

// create one
app.post(BASE + 'admin/posts', postController.create);

// get a list
app.get(
    BASE + 'admin/posts',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    postController.fetch
);

// get one
app.get(
    BASE + 'admin/posts/:id',
    checkSchema({ id: validationSchema.id }),
    postController.get
);

// update one
app.put(
    BASE + 'admin/posts/:id',
    checkSchema({ id: validationSchema.id }),
    postController.update
);

// delete one
app.delete(
    BASE + 'admin/posts/:id',
    checkSchema({ id: validationSchema.id }),
    postController.delete
);

// -- BOOKS routes

app.use(BASE + 'admin/books', passport.session(), checkAuth);

app.post(BASE + 'admin/books', bookController.create);
app.get(
    BASE + 'admin/books',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    bookController.fetch
);
app.get(
    BASE + 'admin/books/:id',
    checkSchema({ id: validationSchema.id }),
    bookController.get
);
app.put(
    BASE + 'admin/books/:id',
    checkSchema({ id: validationSchema.id }),
    bookController.update
);
app.delete(
    BASE + 'admin/books/:id',
    checkSchema({ id: validationSchema.id }),
    bookController.delete
);

// -- ARTICLES routes

app.use(BASE + 'admin/articles', passport.session(), checkAuth);

app.post(BASE + 'admin/articles', articleController.create);
app.get(
    BASE + 'admin/articles',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    articleController.fetch
);
app.get(
    BASE + 'admin/articles/:id',
    checkSchema({ id: validationSchema.id }),
    articleController.get
);
app.put(
    BASE + 'admin/articles/:id',
    checkSchema({ id: validationSchema.id }),
    articleController.update
);
app.delete(
    BASE + 'admin/articles/:id',
    checkSchema({ id: validationSchema.id }),
    articleController.delete
);

// -- EVENTS routes

app.use(BASE + 'admin/events', passport.session(), checkAuth);

app.post(BASE + 'admin/events', eventController.create);
app.get(
    BASE + 'admin/events',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    eventController.fetch
);
app.get(
    BASE + 'admin/events/:id',
    checkSchema({ id: validationSchema.id }),
    eventController.get
);
app.put(
    BASE + 'admin/events/:id',
    checkSchema({ id: validationSchema.id }),
    eventController.update
);
app.delete(
    BASE + 'admin/events/:id',
    checkSchema({ id: validationSchema.id }),
    eventController.delete
);

// --IMAGES routes

app.use('/admin/images', passport.session(), checkAuth);

app.post(
    '/admin/images',
    checkSchema({
        title: validationSchema.textShort,
        altText: validationSchema.textMedium,
        caption: validationSchema.textMedium,
    }),
    upload.single('image'),
    imageController.create
);
app.get(
    '/admin/images',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    imageController.fetch
);
app.get(
    '/admin/images/:id',
    checkSchema({ id: validationSchema.id }),
    imageController.get
);
app.put(
    '/admin/images/:id',
    checkSchema({
        id: validationSchema.id,
        title: validationSchema.textShort,
        altText: validationSchema.textMedium,
        caption: validationSchema.textMedium,
    }),
    imageController.update
);
app.delete(
    '/admin/images/:id',
    checkSchema({ id: validationSchema.id }),
    imageController.delete
);

// -- TAGS routes

app.use(BASE + 'admin/tags', passport.session(), checkAuth);

app.post(BASE + 'admin/tags', tagController.create);
app.get(
    BASE + 'admin/tags',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    tagController.fetch
);
app.get(
    BASE + 'admin/tags/:id',
    checkSchema({ id: validationSchema.id }),
    tagController.get
);
app.put(
    BASE + 'admin/tags/:id',
    checkSchema({ id: validationSchema.id }),
    tagController.update
);
app.delete(
    BASE + 'admin/tags/:id',
    checkSchema({ id: validationSchema.id }),
    tagController.delete
);

//
// -- USER routes

// User UPDATES --

const accessCodeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests. Please wait at least 15 minutes.',
});

const adminUserFormsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests. Please wait at least 15 minutes.',
});

// Initiate register or password reset using admin-created temp code
app.post(
    BASE + 'admin/use/code',
    accessCodeLimiter,
    checkSchema({ code: validationSchema.accessCode }),
    handleValidationErrors,
    verify.accessCode,
    userController.accessRequest
);

// User Registration (--> user account pwd set):

app.use(
    BASE + 'admin/mod',
    checkSchema({
        id: validationSchema.id,
        token: validationSchema.token,
        purpose: validationSchema.purpose,
    }),
    handleValidationErrors,
    verify.userUpdateToken
);

// Check token
app.post(BASE + 'admin/mod/checkAuth', authController.authCheck);

app.post(
    BASE + 'admin/mod/register',
    adminUserFormsLimiter,
    checkSchema({
        name: validationSchema.textShort,
        email: validationSchema.email,
        password: validationSchema.password,
        confirmPassword: validationSchema.confirmPassword,
    }),
    handleValidationErrors,
    verify.userUpdateToken,
    userController.completeAccountSetup
);

// User Password Reset
app.post(
    BASE + 'admin/mod/password-reset',
    adminUserFormsLimiter,
    checkSchema({
        email: validationSchema.email,
        password: validationSchema.password,
        confirmPassword: validationSchema.confirmPassword,
    }),
    handleValidationErrors,
    verify.userUpdateToken,
    userController.passwordReset
);

// User MFA enable, setup, etc.

// Checks that user's most recent login was <15min for all security settings routes
app.use(BASE + 'admin/auth/settings', loginTimeCheck.fifteen);

// Route triggered when users click "enable mfa" (and select method to register),
// OR when users "register 2nd method" (if already enabled)
// CHECK (later): Need more security (like sending a jwt token)? Or is 10 min login check sufficient?
app.post(
    BASE + 'admin/auth/settings/mfa/setup',
    checkSchema({
        method: validationSchema.method,
    }),
    handleValidationErrors,
    userController.setUpMfa
);

// Triggered when users submit otp code to verify a new mfa method
// TODO (later): add limiter + admin authprovider tweaks so user can try entering code up to two(?) times before booted to login
app.post(
    BASE + 'admin/auth/settings/mfa/verify',
    checkSchema({
        method: validationSchema.method,
        otpCode: validationSchema.otpCode,
    }),
    handleValidationErrors,
    userController.verifyMfaMethod
);

app.get(BASE + 'admin/auth/settings/mfa/disable', userController.disableMfa);

app.post(
    BASE + 'admin/auth/settings/change/password',
    adminUserFormsLimiter,
    checkSchema({
        currentPassword: validationSchema.password,
        password: validationSchema.password,
        confirmPassword: validationSchema.confirmPassword,
    }),
    handleValidationErrors,
    userController.passwordChange
);

app.post(
    BASE + 'admin/auth/settings/change/name',
    checkSchema({
        name: validationSchema.textShort,
    }),
    handleValidationErrors,
    userController.changeName
);

// -- User AUTH --

// User Login (name, pwd):

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many failed login attempts. Please wait at least 15 minutes.',
    skipSuccessfulRequests: true,
});

app.post(
    BASE + 'admin/login/password',
    loginLimiter,
    checkSchema({
        email: validationSchema.email,
        password: validationSchema.password,
    }),
    // --> let non-valid become null (continue with middleware)
    passport.session(),
    cleanSession,
    passportAuthenticate.passwordLogin,
    authController.login
);

app.post(
    BASE + 'admin/login/mfa',
    // loginLimiter,
    checkSchema({
        method: validationSchema.method,
        otpCode: validationSchema.otpCode,
    }),
    handleValidationErrors,
    passportAuthenticate.mfaLogin,
    authController.login
);

app.get(
    BASE + 'admin/login/mfa/checkAuth',
    passportAuthenticate.mfaAuthCheck,
    authController.authCheck
);

// Send an email with a new OTP code
// TODO: change Email OTP expires to 5 minutes (?) (mfa login token expires 5 minutes, atm...)
app.post(
    BASE + 'admin/login/mfa/email',
    checkSchema({
        email: validationSchema.email,
    }),
    handleValidationErrors,
    authController.emailOTP
);

// User logout

app.post(BASE + 'admin/logout', authController.logout);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// User Auth Checks

//Route used by front end authCheck when loading security settings page
app.get(
    BASE + 'admin/auth/check-login/1',
    loginTimeCheck.ten,
    authController.authCheck
);

app.get(
    BASE + 'admin/auth/check-login/2',
    loginTimeCheck.fifteen,
    authController.authCheck
);

// User Get Info

app.get(BASE + 'admin/auth/user', async (req, res) => {
    console.log('Starting "get" user identity route...');
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            throw new Error('Invalid.');
        }
        console.log('User found: ', user.email);
        const userInfo = {
            fullName: user.name,
            email: user.email,
            lastLogin: user.lastLogin[1],
            mfa: {
                enabled: user.mfa.enabled,
                methods: user.mfaMethods,
                default: user.mfa.defaultMethod,
                count: user.mfa.methodsVerified,
            },
        };

        res.json(userInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error' });
    }
});

//TODO: Check that in all the endpoints where validation added
// the other middleware is using the validated results (i.e. data = matchedData(req))

// TODO (later): Add logger
// TODO (later): Add GLOBAL rate limiter (or slower - express-slow-down) to main app endpoints
// TODO (later): Snyk? (libraries/dependencies security alerts...)

// TODO (later): change mailchimp to Convert...

// TODO (later): Add device fingerprinting, to improve ux re: MFA (clientjs, or get-browser-fingerprint)

//
//
//
// TEMP Archive -------------------------------
//
// User Auth Checks

// --Not logged in, but token from email required for these routes:

// NOTE: The below two can be removed, I think replaced in earlier section
// app.get(
//     '/admin/mod/register',
//     //VALIDATE params (id, token, purpose),
//     verify.userUpdateToken,
//     authController.authCheck
// );

// app.get(
//     '/admin/mod/password-reset',
//     //VALIDATE params (id, token, purpose),
//     verify.userUpdateToken,
//     authController.authCheck
// );

//
//
// //TEMP:
// app.get('/admin/auth/protectedroute', (req, res) => {
//     console.log('session ID: ', req.sessionID);
//     console.log(req.session);
//     console.log('MaxAge: ', req.session.cookie.maxAge);
//     console.log('Authenticated: ', req.isAuthenticated());
//     res.send('<h1>Protected Page</h1>');
// });

// // TEMP (?):
// app.post('/admin/auth/checkAuth', (req, res) => {
//     console.log('Check auth route was called');
//     console.log('session ID: ', req.sessionID);
//     console.log(req.session);
//     console.log('MaxAge: ', req.session.cookie.maxAge);
//     console.log('Authenticated: ', req.isAuthenticated());
//     res.json({ message: 'Authenticated' });
// });

// app.use(
//     'admin/login/mfa',
//     // VALIDATE (mfa jwt token in header):
//     // checkSchema({
//     ???: validationSchema.jwt,
// }),
//     // handleValidationErrors
// );
