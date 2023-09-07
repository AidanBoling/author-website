import Article from '../model/Article.js';

async function sendResponse(model, dbCollection, data, res, code) {
    const count = await model.find().estimatedDocumentCount();
    // console.log(data, count);
    res.set('Content-Range', `${dbCollection} 0-20/${count}`)
        .status(code)
        .send(data);
}

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

    // Get the list of articles
    fetch: async (req, res) => {
        try {
            const articles = await Article.find({});
            sendResponse(Article, 'articles', articles, res, 200);
        } catch (e) {
            console.log('Error getting posts: ', error);
            response.status(500).send(e);
        }
    },

    // Get a single article
    get: async (req, res) => {
        try {
            const articleId = req.params.id;
            const article = await Article.findById(articleId);
            sendResponse(Article, 'articles', article, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Update an article
    update: async (req, res) => {
        const articleId = req.params.id;
        let updates = { ...req.body, updatedAt: new Date() };
        // console.log('Updates:', updates);

        // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        if (req.body.datePublished && req.body.datePublished.length < 11) {
            updates.datePublished = req.body.datePublished + 'T12:00';
        }

        try {
            const articleToUpdate = await Article.findByIdAndUpdate(
                articleId,
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
            const articleId = req.params.id;
            const articleToDelete = await Article.findById(articleId);
            await Article.findByIdAndDelete(articleId);
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
