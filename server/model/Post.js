import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: [true, 'Post title is missing'] },
    content: [String],
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
    publishDate: Date,
});

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // update the date every time a blog post is saved
    if (!publishDate && published === true) {
        this.publishedDate = Date.now();
    }
    next();
});

const Task = model('Task', taskSchema);
export default Task;
