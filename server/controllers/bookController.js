import { matchedData } from 'express-validator';
import Book from '../model/Book.js';
import {
    sendResponse,
    formatAdminGetListQuery,
} from '../utils/sharedControllerFunctions.js';

// const mainSiteBookController

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
        const { queryFilter, options } = formatAdminGetListQuery(req);

        try {
            // const books = await Book.find(queryFilter, null, options);
            const books = await Book.find(queryFilter).setOptions(options);
            sendResponse(Book, 'books', books, res, 200, queryFilter);
        } catch (error) {
            console.log('Error getting posts: ', error);
            res.status(500).send(error);
        }
    },

    // Get a single book
    get: async (req, res) => {
        try {
            // book = await getItemByValidatedId(Book, req, res, true)
            const { id } = matchedData(req);
            const book = await Book.findById(id);
            sendResponse(Book, 'books', book, res, 200);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },

    // Update a book
    update: async (req, res) => {
        const { id } = matchedData(req);
        let updates = { ...req.body, updatedAt: new Date() };
        // console.log('Updates:', updates);

        // Fix date by adding dummy time (if no time included, date will be incorrect when translated *back* from UTC, client-side)
        if (req.body.datePublished && req.body.datePublished.length < 11) {
            updates.datePublished = req.body.datePublished + 'T12:00';
        }

        try {
            const bookToUpdate = await Book.findByIdAndUpdate(id, updates);
            sendResponse(Book, 'books', { data: bookToUpdate }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    // Delete a book
    delete: async (req, res) => {
        try {
            const { id } = matchedData(req);
            const bookToDelete = await Book.findById(id);
            await Book.findByIdAndDelete(id);
            sendResponse(Book, 'posts', { data: bookToDelete }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },
};

export default bookController;
