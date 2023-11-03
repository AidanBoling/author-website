import { matchedData } from 'express-validator';
import Tag from '../model/Tag.js';
import {
    sendResponse,
    formatAdminGetListQuery,
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
        console.log('Started get list for tags');
        let { queryFilter, options } = formatAdminGetListQuery(req);

        try {
            let tags;
            if (queryFilter.name) {
                const autocompleteQuery = {
                    autocomplete: {
                        path: 'name',
                        query: queryFilter.name,
                    },
                };
                tags = await Tag.aggregate().search(autocompleteQuery);
                console.log('Autocomplete query results: ', tags);
                const tagNames = tags.map(tag => tag.name);
                queryFilter = { name: { $in: tagNames } };
                // console.log(queryFilter);
            } else {
                // tags = await Tag.find(queryFilter, null, options);
                tags = await Tag.find(queryFilter).setOptions(options);
            }
            sendResponse(Tag, 'tags', tags, res, 200, queryFilter);
        } catch (error) {
            console.log('Error getting tags: ', error);
            res.status(500).send(error);
        }
    },

    // Get a single tag
    get: async (req, res) => {
        console.log('Started getID for a tag');
        try {
            const { id } = matchedData(req);
            const tag = await Tag.findById(id);
            sendResponse(Tag, 'tags', tag, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Update a tag
    update: async (req, res) => {
        const { id } = matchedData(req);
        let updates = req.body;
        // console.log('Updates:', updates);

        try {
            const tagToUpdate = await Tag.findByIdAndUpdate(id, updates);

            sendResponse(Tag, 'tags', { data: tagToUpdate }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Delete a tag
    delete: async (req, res) => {
        try {
            const { id } = matchedData(req);
            const tagToDelete = await Tag.findById(id);
            await Tag.findByIdAndDelete(id);
            sendResponse(Tag, 'tags', { data: tagToDelete }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },
};

export default tagController;
