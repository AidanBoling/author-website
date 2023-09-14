import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: [true, 'Book title is missing'] },
    coverImage: String,
    description: { short: String, long: String },
    tags: [String],
    datePublished: Date,
    purchaseInfo: [{ location: String, link: String }],
    category: { type: String, enum: ['fiction', 'non-fiction'] },
    updatedAt: Date,
});

const Book = model('Book', bookSchema);
export default Book;
