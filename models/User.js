const { Schema, model } = require('mongoose');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const user = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [emailRegex, 'Invalid email format'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

user.virtual('friendNumber').get(function () {
    return this.friends.length;
});

const User = model('User', user);
module.exports = User;