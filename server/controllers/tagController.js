import Tag from '../model/Tag.js';

async function sendResponse(model, dbCollection, data, res, code) {
    const count = await model.find().estimatedDocumentCount();
    // console.log(data, count);
    res.set('Content-Range', `${dbCollection} 0-20/${count}`)
        .status(code)
        .send(data);
}

const tagController = {
    // Create an article
    create: async (req, res) => {
        const newTagData = req.body;
        // console.log('Tag: ', newTagData);

        try {
            const newTag = await Tag.create(newTagData);
            sendResponse(Tag, 'tag', newTag, res, 201);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    // Get the list of articles
    fetch: async (req, res) => {
        try {
            const tags = await Tag.find({});
            sendResponse(Tag, 'tags', tags, res, 200);
        } catch (e) {
            console.log('Error getting tags: ', error);
            response.status(500).send(e);
        }
    },

    // Get a single article
    get: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tag = await Tag.findById(tagId);
            sendResponse(Tag, 'tags', tag, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Update an article
    update: async (req, res) => {
        const tagId = req.params.id;
        let updates = req.body;
        // console.log('Updates:', updates);

        try {
            const tagToUpdate = await Tag.findByIdAndUpdate(tagId, updates);

            sendResponse(Tag, 'tags', { data: tagToUpdate }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Delete an article
    delete: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tagToDelete = await Article.findById(articleId);
            await Tag.findByIdAndDelete(tagId);
            sendResponse(Tag, 'tags', { data: tagToDelete }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },
};

export default tagController;
