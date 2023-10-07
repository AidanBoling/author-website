import Tag from '../model/Tag.js';
import {
    sendResponse,
    transformAdminGetList,
} from '../utils/sharedControllerFunctions.js';

const tagController = {
    // Create a tag
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

    // Get the list of tags
    fetch: async (req, res) => {
        const { queryFilter, options } = transformAdminGetList(req);

        try {
            const tags = await Tag.find(queryFilter, null, options);
            sendResponse(Tag, 'tags', tags, res, 200, queryFilter);
        } catch (error) {
            console.log('Error getting tags: ', error);
            res.status(500).send(error);
        }
    },

    // Get a single tag
    get: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tag = await Tag.findById(tagId);
            sendResponse(Tag, 'tags', tag, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Update a tag
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

    // Delete a tag
    delete: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tagToDelete = await Tag.findById(tagId);
            await Tag.findByIdAndDelete(tagId);
            sendResponse(Tag, 'tags', { data: tagToDelete }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },
};

export default tagController;
