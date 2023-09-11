import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const eventSchema = new Schema({
    title: { type: String, required: [true, 'Event title is missing'] },
    date: { start: Date, end: Date },
    location: String,
    details: String,
    actions: [
        {
            label: String,
            link: String,
            external: { type: Boolean, default: true },
        },
    ],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
});

const Event = model('Event', eventSchema);
export default Event;
