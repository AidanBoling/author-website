import express from 'express';
import dotenv from 'dotenv';
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

// app.use(session(sesh));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Hello, World</h1>');
});

app.get('/compose', (req, res) => {
    res.send(
        '<form action="/compose" method="POST"><input type="text" name="postTitle" /><textarea type="text" name="postContent" rows="3"></textarea><button type="submit" name="postPublished" value="true">Publish</button></form>'
    );
});

app.post('/compose', (req, res) => {
    createPost(
        req.body.postTitle,
        req.body.postContent,
        req.body.postPublished
    );
    res.redirect('/compose');
});

async function createPost(title, content, published, res) {
    console.log(content);
    const contentParagraphs = content.split('\r\n\r\n');
    console.log(contentParagraphs);

    const newPost = await Post.create({
        title: title,
        content: contentParagraphs,
        published: published,
    });
    // res.json(newPost);
    console.log(newPost);
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
