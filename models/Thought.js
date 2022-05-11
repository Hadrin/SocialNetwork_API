const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');

const thought = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: () => Date.now,
            get: dateTime => dateTime.toLocateDateString()
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

    thought.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

    const Thought = model('Thought', thought);
    module.exports = Thought;