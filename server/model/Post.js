import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: [true, 'Post title is missing'] },
    image: { url: String, fileName: String, altText: String },
    content: { richText: String, plain: [String] },
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

// postSchema.post('save', function (next) {
//     if (published === true) {
//         this.publishDate = Date.now();
//     }
//     next();
// });

const Post = model('Post', postSchema);
export default Post;
