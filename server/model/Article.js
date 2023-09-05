import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const articleSchema = new Schema({
    title: { type: String, required: [true, 'Book title is missing'] },
    coverImageUrl: String,
    externalUrl: String,
    description: { short: String, long: [String] },
    content: [String],
    datePublished: Date,
    publisher: String,
    tags: [String],
});

const Article = model('Article', articleSchema);
export default Article;
