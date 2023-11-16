import mongoose from 'mongoose';

const { Schema, SchemaTypes, model } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: [true, 'Post title is missing'] },
    image: { fromDB: Schema.Types.ObjectId, url: String, altText: String },
    content: { richText: String },
    tags: [String],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
    published: {
        type: Boolean,
        default: false,
    },
    datePublished: { type: Date, immutable: true },
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // update the date every time a blog post is saved
    next();
});

// postSchema.pre('save', function (next) {
//     if (published === true) {
//         this.publishDate = Date.now();
//     }
//     return next();
// });

// postSchema.plugin(require('mongoose-autopopulate'));

const Post = model('Post', postSchema);
export default Post;
