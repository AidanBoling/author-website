import Post from '../model/Post.js';

async function sendResponse(model, dbCollection, data, res, code, filter = {}) {
    let count;
    if (Object.keys(filter).length) {
        count = await model.countDocuments(filter);
    } else {
        count = await model.estimatedDocumentCount(filter);
    }
    console.log('Found: ', count);
    res.set('Content-Range', `${dbCollection} 0-20/${count}`)
        .status(code)
        .send(data);
}

// const categories = await Category.find({});
// res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
// res.setHeader('Content-Range', posts 0-15/${categories.length});
// res.send(categories);

const postController = {
    // Create a post
    create: async (request, response) => {
        const post = request.body;
        let contentPlain = post.content.plain;
        console.log(post.content);

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

    // Get the list of posts
    fetch: async (req, res) => {
        const queryFilter = JSON.parse(req.query.filter);
        const range = JSON.parse(req.query.range);
        const limit = range[1];
        const skip = range[0];

        try {
            const posts = await Post.find(queryFilter).sort([
                JSON.parse(req.query.sort),
            ]);
            sendResponse(Post, 'posts', posts, res, 200, queryFilter);
        } catch (error) {
            console.log('Error getting posts: ', error);
            response.status(500).send(error);
        }
    },

    // Get a single post
    get: async (request, response) => {
        try {
            const postId = request.params.id;
            const post = await Post.findById(postId);
            sendResponse(Post, 'posts', post, response, 200);

            // const postCount = await Post.find().estimatedDocumentCount();
            // response.header('Content-Range', `posts 0-10/${postCount}`);
            // response.code(200).send(post);
        } catch (error) {
            response.status(500).send(error);
        }
    },

    // Update a post
    update: async (request, response) => {
        const postId = request.params.id;
        let updates = { ...request.body, updatedAt: new Date() };
        if (updates.published && !updates.datePublished) {
            updates = { ...updates, datePublished: new Date() };
        }
        console.log(updates);

        try {
            const postToUpdate = await Post.findByIdAndUpdate(postId, updates);
            // const postToUpdate = await Post.findById(postId);
            sendResponse(Post, 'posts', { data: postToUpdate }, response, 200);

            // const postCount = await Post.find().estimatedDocumentCount();
            // response.header('Content-Range', `posts 0-10/${postCount}`);
            // response.code(200).send({ data: postToUpdate });
        } catch (e) {
            response.status(500).send(e);
        }
    },

    // Delete a post
    delete: async (request, response) => {
        try {
            const postId = request.params.id;
            const postToDelete = await Post.findById(postId);
            await Post.findByIdAndDelete(postId);
            sendResponse(Post, 'posts', { data: postToDelete }, response, 200);

            //   const postCount = await Post.find().estimatedDocumentCount();
            //   response.header('Content-Range', `posts 0-10/${postCount}`);
            //   response.code(200).send({ data: postToDelete });
        } catch (error) {
            response.status(500).send(error);
        }
    },
};

export default postController;
