import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const articleSchema = new Schema({
    title: { type: String, required: [true, 'Article title is missing'] },
    image: { fromDB: Schema.Types.ObjectId, url: String, altText: String },
    url: String,
    descriptionShort: String,
    content: String,
    datePublished: Date,
    publisher: { name: String, website: String },
    tags: [String],
    updatedAt: Date,
});

const Article = model('Article', articleSchema);
export default Article;
