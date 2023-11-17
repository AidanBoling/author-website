import { matchedData } from 'express-validator';
import Post from '../model/Post.js';
import {
    sendResponse,
    formatAdminGetListQuery,
} from '../utils/sharedControllerFunctions.js';

const postController = {
    // Create a post
    create: async (req, res) => {
        const post = req.body;
        // let teaser = post.content.teaser;
        console.log('New post content: ', post.content);

        // if (contentPlain) {
        //     contentPlain = post.content.teaser.split('\n\n');
        // }

        let newPostData = {
            title: post.title,
            image: post.image,
            content: {
                richText: post.content.richText,
                teaser: post.content.teaser,
                // plain: contentPlain,
            },
            tags: post.tags,
            published: post.published,
        };

        if (post.published) {
            newPostData = { ...newPostData, datePublished: new Date() };
        }

        try {
            const newPost = await Post.create(newPostData);
            sendResponse(Post, 'posts', newPost, res, 201);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    // Get a list of posts
    fetch: async (req, res) => {
        console.log('Started getting list of posts...');
        const { queryFilter, options } = formatAdminGetListQuery(req);

        try {
            // const posts = await Post.find(queryFilter, null, options);
            const posts = await Post.find(queryFilter).setOptions(options);
            sendResponse(Post, 'posts', posts, res, 200, queryFilter);
        } catch (error) {
            console.log('Error getting posts: ', error);
            res.status(500).send(error);
        }
    },

    // Get a single post
    get: async (req, res) => {
        console.log('Started fetching a single post...');
        try {
            const { id } = matchedData(req);
            // const postId = req.params.id;
            const post = await Post.findById(id);
            sendResponse(Post, 'posts', post, res, 200);
        } catch (error) {
            console.log('Error getting post: ', error);
            res.status(500).send(error);
        }
    },

    // Update a post
    update: async (req, res) => {
        const { id } = matchedData(req);
        let updates = { ...req.body, updatedAt: new Date() };

        if (updates.published && !updates.datePublished) {
            updates = { ...updates, datePublished: new Date() };
        }
        console.log(updates);

        try {
            const postToUpdate = await Post.findByIdAndUpdate(id, updates);
            // const postToUpdate = await Post.findById(postId);
            sendResponse(Post, 'posts', { data: postToUpdate }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Delete a post
    delete: async (req, res) => {
        try {
            const { id } = matchedData(req);
            // const postId = req.params.id;
            const postToDelete = await Post.findById(id);
            await Post.findByIdAndDelete(id);
            sendResponse(Post, 'posts', { data: postToDelete }, res, 200);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default postController;
