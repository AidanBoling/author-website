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
    create: async (request, response) => {
        const newBookData = request.body;
        // console.log('Book: ', newBookData);

        // if (post.published) {
        //     newPostData = { ...newPostData, publishedDate: new Date() };
        // }

        try {
            const newBook = await Book.create(newBookData);
            sendResponse(Book, 'books', newBook, response, 201);
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
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
    get: async (request, response) => {
        try {
            const bookId = request.params.id;
            const book = await Book.findById(bookId);
            sendResponse(Book, 'books', book, response, 200);
        } catch (e) {
            response.status(500).send(e);
        }
    },

    // Update a book
    update: async (request, response) => {
        const bookId = request.params.id;
        let updates = { ...request.body, updatedAt: new Date() };
        // console.log('Updates:', updates);

        try {
            const bookToUpdate = await Book.findByIdAndUpdate(bookId, updates);
            sendResponse(Book, 'books', { data: bookToUpdate }, response, 200);
        } catch (e) {
            response.status(500).send(e);
        }
    },

    // Delete a book
    delete: async (request, response) => {
        try {
            const bookId = request.params.id;
            const bookToDelete = await Book.findById(bookId);
            await Book.findByIdAndDelete(bookId);
            sendResponse(Book, 'posts', { data: bookToDelete }, response, 200);
        } catch (e) {
            response.status(500).send(e);
        }
    },
};

export default bookController;
