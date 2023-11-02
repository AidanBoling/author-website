import Article from '../model/Article.js';
import {
    sendResponse,
    formatAdminGetListQuery,
} from '../utils/sharedControllerFunctions.js';

const articleController = {
    // Create an article
    create: async (request, response) => {
        const newArticleData = request.body;
        // console.log('Article: ', newArticleData);

        // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        if (newArticleData.datePublished) {
            newArticleData.datePublished =
                request.body.datePublished + 'T12:00';
        }

        try {
            const newArticle = await Article.create(newArticleData);
            sendResponse(Article, 'articles', newArticle, response, 201);
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    },

    // Get a list of articles
    fetch: async (req, res) => {
        const { queryFilter, options } = formatAdminGetListQuery(req);
        try {
            // const articles = await Article.find(queryFilter, null, options);
            const articles = await Article.find(queryFilter).setOptions(
                options
            );
            sendResponse(Article, 'articles', articles, res, 200, queryFilter);
        } catch (error) {
            console.log('Error getting articles: ', error);
            res.status(500).send(error);
        }
    },

    // Get a single article
    get: async (req, res) => {
        try {
            const { id } = matchedData(request);
            const article = await Article.findById(id);
            sendResponse(Article, 'articles', article, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Update an article
    update: async (req, res) => {
        const { id } = matchedData(request);
        let updates = { ...req.body, updatedAt: new Date() };
        // console.log('Updates:', updates);

        // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        if (req.body.datePublished && req.body.datePublished.length < 11) {
            updates.datePublished = req.body.datePublished + 'T12:00';
        }

        try {
            const articleToUpdate = await Article.findByIdAndUpdate(
                id,
                updates
            );
            sendResponse(
                Article,
                'articles',
                { data: articleToUpdate },
                res,
                200
            );
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Delete an article
    delete: async (req, res) => {
        try {
            const { id } = matchedData(request);
            const articleToDelete = await Article.findById(id);
            await Article.findByIdAndDelete(id);
            sendResponse(
                Article,
                'articles',
                { data: articleToDelete },
                res,
                200
            );
        } catch (e) {
            res.status(500).send(e);
        }
    },
};

export default articleController;
