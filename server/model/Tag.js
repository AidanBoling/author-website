import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const colors = [
    '#54478C',
    '#2C699A',
    '#048BA8',
    '#0DB39E',
    '#16DB93',
    '#83E377',
    '#B9E769',
    '#EFEA5A',
    '#F1C453',
    '#F29E4C',
    '#f94144',
];

function randomColor() {
    randomIndex = Math.floor(Math.random() * colors.length);
    return colors[index];
}

const tagSchema = new Schema({
    name: { type: String, required: [true, 'Tag label is missing'] },
    color: {
        type: String,
        default: () => randomColor(),
    },
});

const Tag = model('Tag', tagSchema);
export default Tag;
