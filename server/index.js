import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mailchimp from '@mailchimp/mailchimp_marketing';
// import nodemailer from 'nodemailer';
// import sanitizeHtml from 'sanitize-html';
import {
    validationResult,
    matchedData,
    checkSchema,
    query,
} from 'express-validator';
import session from 'express-session';
import passport from 'passport';
import { initializePassport } from './utils/passportHelper.js';
import cookieParser from 'cookie-parser';

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

if (isDev) {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 8000;
const corsOrigin = 'http://app.localhost:3000';
// const corsOrigin = process.env.CLIENT_URL;

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//     },
// });

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

// async function pingMC() {
//     const response = await mailchimp.ping.get();
//     console.log(response);
// }
// pingMC();

// const sanitizeOptionsNoHTML = { allowedTags: [], allowedAttributes: {} };

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.DB}?retryWrites=true&w=majority`
);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: corsOrigin,
        exposedHeaders: 'Content-Range,X-Total-Count',
        methods: 'GET,POST',
        // allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    })
);

//TODO: move session details to separate file
app.use(
    '/admin',
    session({
        name: 'id',
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            domain: '.app.localhost', //Remove in Production
            path: '/admin',
            httpOnly: true,
            // secure: true,
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

// Checks sessions for user object; if not found, then not authenticated, routing process halted
// app.use('/admin', passport.session());
app.use('/admin/auth', passport.session(), checkAuth);
initializePassport(app, passport);

// MAIN APP

app.get('/', (req, res) => {
    res.send('<h1>Hello, World</h1>');
});

// -- Posts routes

const listPageValidation = {
    page: validationSchema.resources.page,
    limit: validationSchema.resources.limit,
};

//TODO: validation -- check incoming queries/params (site frontend)
app.get('/posts', checkSchema({ ...listPageValidation }), (req, res) => {
    const overrides = { filter: { published: true } };
    const defaultSort = { datePublished: -1 };

    try {
        getFilteredResourceList(Post, req, res, defaultSort, overrides);
    } catch (error) {
        handleGetItemsError(error, res);
    }
});

app.get(
    '/posts/id/:id',
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
    '/books',
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
    '/books/id/:id',
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

app.get('/articles', checkSchema({ ...listPageValidation }), (req, res) => {
    const defaultSort = { datePublished: -1 };

    try {
        getFilteredResourceList(Article, req, res, defaultSort);
    } catch (error) {
        handleGetItemsError(error, res);
    }
});

app.get(
    '/articles/id/:id',
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
app.get('/events', checkSchema({ ...listPageValidation }), async (req, res) => {
    try {
        const allEvents = await Event.find();
        console.log(allEvents);
        res.json(allEvents);
    } catch {
        handleGetItemsError(error, res);
    }
});

// -- Form routes

// TODO: check (refactor if needed) sanitization settings/process.
app.post(
    '/form/contact',
    checkSchema({
        name: validationSchema.textShort,
        email: validationSchema.email,
    }),
    // TODO: add handleErrors -> kick back to user with error
    sanitizeContactFormInput,
    contactFormController
);

app.post(
    '/form/subscribe',
    checkSchema({ email: validationSchema.email }),
    handleValidationErrors,
    sanitizeSubscribeFormInput,
    subscribeMailingListController
);

//
// ADMIN APP
//

// TODO: make sure mongoose to throws error if validation fails for create & update

// -- POSTS routes

app.use('/admin/posts', checkAuth);

// create one
app.post('/admin/posts', postController.create);

// get a list
app.get(
    '/admin/posts',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    postController.fetch
);

// get one
app.get(
    '/admin/posts/:id',
    checkSchema({ id: validationSchema.id }),
    postController.get
);

// update one
app.put(
    '/admin/posts/:id',
    checkSchema({ id: validationSchema.id }),
    postController.update
);

// delete one
app.delete(
    '/admin/posts/:id',
    checkSchema({ id: validationSchema.id }),
    postController.delete
);

// -- BOOKS routes

app.use('/admin/books', passport.session(), checkAuth);

app.post('/admin/books', bookController.create);
app.get(
    '/admin/books',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    bookController.fetch
);
app.get(
    '/admin/books/:id',
    checkSchema({ id: validationSchema.id }),
    bookController.get
);
app.put(
    '/admin/books/:id',
    checkSchema({ id: validationSchema.id }),
    bookController.update
);
app.delete(
    '/admin/books/:id',
    checkSchema({ id: validationSchema.id }),
    bookController.delete
);

// -- ARTICLES routes

app.use('/admin/articles', passport.session(), checkAuth);

app.post('/admin/articles', articleController.create);
app.get(
    '/admin/articles',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    articleController.fetch
);
app.get(
    '/admin/articles/:id',
    checkSchema({ id: validationSchema.id }),
    articleController.get
);
app.put(
    '/admin/articles/:id',
    checkSchema({ id: validationSchema.id }),
    articleController.update
);
app.delete(
    '/admin/articles/:id',
    checkSchema({ id: validationSchema.id }),
    articleController.delete
);

// -- EVENTS routes

app.use('/admin/events', passport.session(), checkAuth);

app.post('/admin/events', eventController.create);
app.get(
    '/admin/events',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    eventController.fetch
);
app.get(
    '/admin/events/:id',
    checkSchema({ id: validationSchema.id }),
    eventController.get
);
app.put(
    '/admin/events/:id',
    checkSchema({ id: validationSchema.id }),
    eventController.update
);
app.delete(
    '/admin/events/:id',
    checkSchema({ id: validationSchema.id }),
    eventController.delete
);

// -- TAGS routes

app.use('/admin/tags', passport.session(), checkAuth);

app.post('/admin/tags', tagController.create);
app.get(
    '/admin/tags',
    parseQuery,
    checkSchema(validationSchema.adminQuery),
    tagController.fetch
);
app.get(
    '/admin/tags/:id',
    checkSchema({ id: validationSchema.id }),
    tagController.get
);
app.put(
    '/admin/tags/:id',
    checkSchema({ id: validationSchema.id }),
    tagController.update
);
app.delete(
    '/admin/tags/:id',
    checkSchema({ id: validationSchema.id }),
    tagController.delete
);

//
// -- USER routes

// User UPDATES --

// Initiate register or password reset using admin-created temp code
app.post(
    '/admin/use/code',
    checkSchema({ code: validationSchema.accessCode }),
    handleValidationErrors,
    verify.accessCode,
    userController.accessRequest
);

// User Registration (--> user account pwd set):

app.use(
    '/admin/mod',
    checkSchema({
        id: validationSchema.id,
        token: validationSchema.token,
        purpose: validationSchema.purpose,
    }),
    handleValidationErrors,
    verify.userUpdateToken
);

// Check token
app.post('/admin/mod/checkAuth', authController.authCheck);

app.post(
    '/admin/mod/register',
    checkSchema({
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
    '/admin/mod/password-reset',
    checkSchema({
        email: validationSchema.email,
        password: validationSchema.password,
        confirmPassword: validationSchema.confirmPassword,
    }),
    handleValidationErrors,
    verify.userUpdateToken,
    userController.passwordReset
);

// User MFA enable, setup, etc...

// Checks that user's most recent login was <15min for all security settings routes
app.use('/admin/auth/settings', loginTimeCheck.fifteen);

// This route triggered when users click "enable mfa" (and select method to register),
// OR when users "register 2nd method" (if already enabled)
// CHECK (later): Need more security (like sending a jwt token)? Or is 10 min login check sufficient?
app.post(
    '/admin/auth/settings/mfa/setup',
    checkSchema({
        method: validationSchema.method,
    }),
    handleValidationErrors,
    userController.setUpMfa
);

// Triggered when users submit otp code to verify a new mfa method
app.post(
    '/admin/auth/settings/mfa/verify',
    checkSchema({
        method: validationSchema.method,
        otpCode: validationSchema.otpCode,
    }),
    handleValidationErrors,
    userController.verifyMfaMethod
);

app.get('/admin/auth/settings/mfa/disable', userController.disableMfa);

app.post(
    '/admin/auth/settings/change/password',
    checkSchema({
        currentPassword: validationSchema.password,
        password: validationSchema.password,
        confirmPassword: validationSchema.confirmPassword,
    }),
    handleValidationErrors,
    userController.passwordChange
);

app.post(
    '/admin/auth/settings/change/name',
    checkSchema({
        name: validationSchema.textShort,
    }),
    handleValidationErrors,
    userController.changeName
);

// -- User AUTH --

// User Login (name, pwd):

app.post(
    '/admin/login/password',
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

// app.use(
//     'admin/login/mfa',
//     // VALIDATE (mfa jwt token in header):
//     // checkSchema({
//     ???: validationSchema.jwt,
// }),
//     // handleValidationErrors
// );

app.post(
    '/admin/login/mfa',
    checkSchema({
        method: validationSchema.method,
        otpCode: validationSchema.otpCode,
    }),
    handleValidationErrors,
    passportAuthenticate.mfaLogin,
    authController.login
);

app.get(
    '/admin/login/mfa/checkAuth',
    passportAuthenticate.mfaAuthCheck,
    authController.authCheck
);

// Send an email with a new OTP code
// TODO: change Email OTP expires to 5 minutes (?) (mfa login token expires 5 minutes, atm...)
app.post(
    '/admin/login/mfa/email',
    checkSchema({
        email: validationSchema.email,
    }),
    handleValidationErrors,
    authController.emailOTP
);

// User logout

app.post('/admin/logout', authController.logout);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// User Auth Checks

//Route used by front end authCheck when loading security settings page
app.get(
    '/admin/auth/check-login/1',
    loginTimeCheck.ten,
    authController.authCheck
);

app.get(
    '/admin/auth/check-login/2',
    loginTimeCheck.fifteen,
    authController.authCheck
);

// User Get Info

app.get('/admin/auth/user', async (req, res) => {
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

// TODO: Helmet
// TODO (?): logger?
// TODO: "bouncer" -- limit the number of wrong attempts in given time, or given ip/user context?
// And/or load-limiter -- limit max request size.

//TODO: Check that in all the endpoints where validation added
// the other middleware is using the validated results (i.e. data = matchedData(req))

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
