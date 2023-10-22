import mongoose from 'mongoose';
// import argon2 from 'argon2';

const { Schema, SchemaTypes, model } = mongoose;

const codeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        immutable: true,
    },
    value: {
        type: String,
        required: true,
        immutable: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        expires: 3600, // in seconds, = 1 hour
        immutable: true,
    },
});

const Code = model('Code', codeSchema);
export default Code;
