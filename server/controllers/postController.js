import { matchedData } from 'express-validator';
import Post from '../model/Post.js';
import {
    sendResponse,
    formatAdminGetListQuery,
} from '../utils/sharedControllerFunctions.js';

const postController = {
    // Create a post
    create: async (request, response) => {
        const post = request.body;
        // let contentPlain = post.content.plain;
        console.log('New post content: ', post.content);

        // if (contentPlain) {
        //     contentPlain = post.content.plain.split('\n\n');
        // }

        let newPostData = {
            title: post.title,
            content: {
                richText: post.content.richText,
                teaser: post.content.teaser,
                // plain: contentPlain,
            },
            published: post.published,
        };

        if (post.published) {
            newPostData = { ...newPostData, datePublished: new Date() };
        }

        try {
            const newPost = await Post.create(newPostData);
            sendResponse(Post, 'posts', newPost, response, 201);
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
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
    get: async (request, response) => {
        console.log('Started fetching a single post...');
        try {
            const { id } = matchedData(request);
            // const postId = request.params.id;
            const post = await Post.findById(id);
            sendResponse(Post, 'posts', post, response, 200);
        } catch (error) {
            console.log('Error getting post: ', error);
            response.status(500).send(error);
        }
    },

    // Update a post
    update: async (request, response) => {
        const { id } = matchedData(request);

        // const postId = request.params.id;
        let updates = { ...request.body, updatedAt: new Date() };
        if (updates.published && !updates.datePublished) {
            updates = { ...updates, datePublished: new Date() };
        }
        console.log(updates);

        try {
            const postToUpdate = await Post.findByIdAndUpdate(id, updates);
            // const postToUpdate = await Post.findById(postId);
            sendResponse(Post, 'posts', { data: postToUpdate }, response, 200);
        } catch (e) {
            response.status(500).send(e);
        }
    },

    // Delete a post
    delete: async (request, response) => {
        try {
            const { id } = matchedData(request);
            // const postId = request.params.id;
            const postToDelete = await Post.findById(id);
            await Post.findByIdAndDelete(id);
            sendResponse(Post, 'posts', { data: postToDelete }, response, 200);
        } catch (error) {
            response.status(500).send(error);
        }
    },
};

export default postController;
