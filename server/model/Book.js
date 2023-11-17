import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: [true, 'Book title is missing'] },
    coverImage: { type: Schema.Types.ObjectId, ref: 'Image' },
    coverImagePlaceholder: String,
    description: { short: String, long: String },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    datePublished: Date,
    purchaseInfo: [{ location: String, link: String }],
    category: { type: String, enum: ['fiction', 'non-fiction'] },
    updatedAt: Date,
});

const Book = model('Book', bookSchema);
export default Book;
