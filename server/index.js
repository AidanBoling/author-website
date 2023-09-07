import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import postController from './controllers/postController.js';
import bookController from './controllers/bookController.js';
import articleController from './controllers/articleController.js';

// import session from 'express-session';
// import passport from 'passport';
// import passportLocalMongoose from 'passport-local-mongoose';

import mongoose, { isObjectIdOrHexString, Types } from 'mongoose';
import Post from './model/Post.js';
import Book from './model/Book.js';
import Article from './model/Article.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 8000;
const corsOrigin = '*';

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
    console.log(allBooks);
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
    console.log(allArticles);
    res.json(allArticles);
});

app.get('/articles/id/:id', async (req, res) => {
    const article = await Article.findById(`${req.params.id}`);
    if (article) {
        console.log('Article retrieved from db: ', article);
        res.json(article);
    } else {
        console.log('Something went wrong in retrieving article');
        res.json({ title: 'Article Not Found' });
    }
});

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

// create one
app.post('/admin/books', bookController.create);

// get a list
app.get('/admin/books', bookController.fetch);

// get one
app.get('/admin/books/:id', bookController.get);

// update one
app.put('/admin/books/:id', bookController.update);

// delete one
app.delete('/admin/books/:id', bookController.delete);

// -- ARTICLES routes

// create one
app.post('/admin/articles', articleController.create);

// get a list
app.get('/admin/articles', articleController.fetch);

// get one
app.get('/admin/articles/:id', articleController.get);

// update one
app.put('/admin/articles/:id', articleController.update);

// delete one
app.delete('/admin/articles/:id', articleController.delete);

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
