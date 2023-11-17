import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const imageSchema = new Schema({
    title: { type: String, required: [true, 'Image title is missing'] },
    altText: String,
    caption: String,
    group: [String],
    url: { type: String, required: [true, 'Url is missing'] },
    fileName: { type: String, required: [true, 'File name is missing'] },
    dimensions: { width: Number, height: Number },
    orientation: { type: String, enum: ['landscape', 'portrait', 'square'] },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // update the date every time image is saved
    next();
});

const Image = model('Image', imageSchema);
export default Image;
