import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: [true, 'Book title is missing'] },
    coverImageUrl: String,
    description: { short: String, long: String },
    tags: [String],
    datePublished: Date,
    storeLink: String,
    category: { type: String, enum: ['Fiction', 'Non-fiction'] },
});

const Book = model('Book', bookSchema);
export default Book;
