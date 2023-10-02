import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mailchimp from '@mailchimp/mailchimp_marketing';
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import postController from './controllers/postController.js';
import bookController from './controllers/bookController.js';
import articleController from './controllers/articleController.js';
import eventController from './controllers/eventController.js';
import contactFormController from './controllers/contactFormController.js';
import subscribeMailingListController from './controllers/subscribeController.js';

// import session from 'express-session';
// import passport from 'passport';
// import passportLocalMongoose from 'passport-local-mongoose';

import mongoose, { isObjectIdOrHexString, Types } from 'mongoose';
import Post from './model/Post.js';
import Book from './model/Book.js';
import Article from './model/Article.js';
import Event from './model/Event.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 8000;
const corsOrigin = '*';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

// async function pingMC() {
//     const response = await mailchimp.ping.get();
//     console.log(response);
// }

// pingMC();

const sanitizeOptionsNoHTML = { allowedTags: [], allowedAttributes: {} };

// app.use(session(sesh));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: corsOrigin,
        exposedHeaders: 'Content-Range,X-Total-Count',
    })
);

// MAIN APP

app.get('/', (req, res) => {
    res.send('<h1>Hello, World</h1>');
});

// -- Posts routes

app.get('/posts', async (req, res) => {
    const allPosts = await Post.find().where('published').equals('true');
    // console.log(allPosts);
    res.json(allPosts);
});

app.get('/posts/id/:id', async (req, res) => {
    const post = await Post.findById(`${req.params.id}`);
    if (post) {
        res.json(post);
    } else {
        res.json({ title: 'Post Not Found' });
    }
});

// -- Books routes

app.get('/books', async (req, res) => {
    const allBooks = await Book.find();
    // console.log(allBooks);
    res.json(allBooks);
});

app.get('/books/id/:id', async (req, res) => {
    const book = await Book.findById(`${req.params.id}`);
    if (book) {
        res.json(book);
    } else {
        res.json({ title: 'Book Not Found' });
    }
});

// -- Articles routes

app.get('/articles', async (req, res) => {
    const allArticles = await Article.find();
    // console.log(allArticles);
    res.json(allArticles);
});

app.get('/articles/id/:id', async (req, res) => {
    const article = await Article.findById(`${req.params.id}`);
    if (article) {
        res.json(article);
    } else {
        res.json({ title: 'Article Not Found' });
    }
});

// -- Events routes

app.get('/events', async (req, res) => {
    const allEvents = await Event.find();
    console.log(allEvents);
    res.json(allEvents);
});

// -- Form routes

app.post('/form/contact', (req, res) => {
    // console.log(req.body);

    const data = {
        name:
            sanitizeHtml(req.body.fName, sanitizeOptionsNoHTML) +
            ' ' +
            sanitizeHtml(req.body.lName, sanitizeOptionsNoHTML),
        email: sanitizeHtml(req.body.email, sanitizeOptionsNoHTML),
        messageArray: sanitizeHtml(
            req.body.message,
            sanitizeOptionsNoHTML
        ).split(/\n+/),
    };

    const emailInvariants = {
        from: `"Post Service" <${process.env.GMAIL_USER}>`,
        to: `${process.env.GMAIL_USER}`,
    };

    // const mParagraphs = data.message.split(/\n+/);
    console.log(data);

    contactFormController(data, emailInvariants, transporter, res);

    // res.status(200).json({ message: 'Success' });
});

app.post('/form/subscribe', (req, res) => {
    console.log(req.body);

    const listId = process.env.MAILCHIMP_AUDIENCE_ID;
    const subscriber = {
        firstName: sanitizeHtml(req.body.fName, sanitizeOptionsNoHTML),
        lastName: sanitizeHtml(req.body.lName, sanitizeOptionsNoHTML),
        email: sanitizeHtml(req.body.email, sanitizeOptionsNoHTML),
    };

    subscribeMailingListController(listId, subscriber, mailchimp, res);
});

// ADMIN APP

// -- POSTS routes

// create one
app.post('/admin/posts', postController.create);

// get a list
app.get('/admin/posts', postController.fetch);

// get one
app.get('/admin/posts/:id', postController.get);

// update one
app.put('/admin/posts/:id', postController.update);

// delete one
app.delete('/admin/posts/:id', postController.delete);

// -- BOOKS routes

app.post('/admin/books', bookController.create);
app.get('/admin/books', bookController.fetch);
app.get('/admin/books/:id', bookController.get);
app.put('/admin/books/:id', bookController.update);
app.delete('/admin/books/:id', bookController.delete);

// -- ARTICLES routes

app.post('/admin/articles', articleController.create);
app.get('/admin/articles', articleController.fetch);
app.get('/admin/articles/:id', articleController.get);
app.put('/admin/articles/:id', articleController.update);
app.delete('/admin/articles/:id', articleController.delete);

// -- EVENTS routes

app.post('/admin/events', eventController.create);
app.get('/admin/events', eventController.fetch);
app.get('/admin/events/:id', eventController.get);
app.put('/admin/events/:id', eventController.update);
app.delete('/admin/events/:id', eventController.delete);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    });

// const allBooks = await Book.find();
// console.log(allBooks);

// app.get('/compose', (req, res) => {
//     res.send(
//         '<form action="/compose" method="POST"><input type="text" name="title" /><textarea type="text" name="content" rows="3"></textarea><button type="submit" name="postPublished" value="true">Publish</button></form>'
//     );
// });

// app.post('/compose', (req, res) => {
//     createPost(req.body.title, req.body.content.plain, req.body.published, res);
//     //Send response back to client-side confirming success?
//     // res.json(newPost);
// });

// async function createPost(title, content, published, res) {
//     await Post.create({
//         title: title,
//         content: content.split('\n\n'),
//         published: published,
//     })
//         .then(newPost => {
//             console.log('Created post:\n' + newPost);
//             res.json(newPost);
//         })
//         .catch(err => {
//             console.log('Project not created: ' + err);
//             res.json('Project not created');
//         });
// }
