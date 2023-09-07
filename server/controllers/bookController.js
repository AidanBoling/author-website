import Book from '../model/Book.js';

async function sendResponse(model, dbCollection, data, res, code) {
    const count = await model.find().estimatedDocumentCount();
    console.log(data, count);
    res.set('Content-Range', `${dbCollection} 0-20/${count}`)
        .status(code)
        .send(data);
}

const bookController = {
    // Create a book
    create: async (req, res) => {
        const newBookData = req.body;
        // console.log('Book: ', newBookData);

        // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        if (newBookData.datePublished) {
            newBookData.datePublished = req.body.datePublished + 'T12:00';
        }

        try {
            const newBook = await Book.create(newBookData);
            sendResponse(Book, 'books', newBook, res, 201);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    // Get the list of books
    fetch: async (req, res) => {
        try {
            const books = await Book.find({});
            sendResponse(Book, 'books', books, res, 200);
        } catch (e) {
            console.log('Error getting posts: ', error);
            response.status(500).send(e);
        }
    },

    // Get a single book
    get: async (req, res) => {
        try {
            const bookId = req.params.id;
            const book = await Book.findById(bookId);
            sendResponse(Book, 'books', book, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Update a book
    update: async (req, res) => {
        const bookId = req.params.id;
        let updates = { ...req.body, updatedAt: new Date() };
        // console.log('Updates:', updates);

        // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        if (req.body.datePublished && req.body.datePublished.length < 11) {
            updates.datePublished = req.body.datePublished + 'T12:00';
        }

        try {
            const bookToUpdate = await Book.findByIdAndUpdate(bookId, updates);
            sendResponse(Book, 'books', { data: bookToUpdate }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Delete a book
    delete: async (req, res) => {
        try {
            const bookId = req.params.id;
            const bookToDelete = await Book.findById(bookId);
            await Book.findByIdAndDelete(bookId);
            sendResponse(Book, 'posts', { data: bookToDelete }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },
};

export default bookController;
