import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// import session from 'express-session';
// import passport from 'passport';
// import passportLocalMongoose from 'passport-local-mongoose';

import mongoose, { isObjectIdOrHexString, Types } from 'mongoose';
import Post from './model/Post.js';

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
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello, World</h1>');
});

app.get('/posts', async (req, res) => {
    const allPosts = await Post.find().where('published').equals('true');
    // console.log(allPosts);
    res.json(allPosts);
});

app.get('/compose', (req, res) => {
    res.send(
        '<form action="/compose" method="POST"><input type="text" name="title" /><textarea type="text" name="content" rows="3"></textarea><button type="submit" name="postPublished" value="true">Publish</button></form>'
    );
});

app.post('/compose', (req, res) => {
    createPost(req.body.title, req.body.content, req.body.published, res);
    //Send response back to client-side confirming success?
    // res.json(newPost);
    // res.redirect('/compose');
});

async function createPost(title, content, published, res) {
    // console.log(title, content, published);
    // const contentParagraphs = content.split('\n\n');
    // console.log(contentParagraphs);
    // return contentParagraphs;

    await Post.create({
        title: title,
        content: content.split('\n\n'),
        published: published,
    })
        .then(newPost => {
            console.log('Created post:\n' + newPost);
            res.json(newPost);
        })
        .catch(err => {
            console.log('Project not created: ' + err);
            res.json('Project not created');
        });

    // return newPost;
}

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    });

const allPosts = await Post.where('published').equals('true').exec();
console.log(allPosts);
