const { Thought, User } = require('../models');
const { findOneAndUpdate } = require('../models/User');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find()
        .populate('reactions')
        .then((thoughts) => res.json(thoughts));
    },
    getOneThought(req, res){
        Thought.findOne({ _id: req.params.thoughtID })
        .populate('reactions')
        .then((thought) => res.json(thought));
    },
    createThought(req, res){
        Thought.create(req.body)
        .then((newThought) => {
        User.findOneAndUpdate({
            _id: req.body.userID
        }, {
            $push: { thoughts: newThought._id }
        });
    });
        res.sendStatus(200);
    },
    updateThought(req, res){
        Thought.findOneAndUpdate({
            _id: req.params.thoughtID
        }, {
            $set: req.body
        });
        res.sendStatus(200);
    },
    deleteThought(req, res){
        Thought.findOneAndDelete({
            _id: req.params.thoughtID
        });
        User.findOneAndUpdate({
            thoughts: req.params.thoughtID
        }, {
            $pull: { thoughts: req.params.thoughtID }
        });
        res.sendStatus(200);
    },

    addReaction(req, res){
        Thought.findOneAndUpdate({
            _id: req.params.thoughtID
        }, {
            $addToSet: {reactions: req.body}
        });
        res.sendStatus(200);
    },
    removeReaction(req, res){
        Thought.findOneAndUpdate({
            _id: req.params.thoughtID
        }, {
            $pull: { reactions: { reactionId: req.params.reactionID}}
        });
        res.sendStatus(200);
    }
}

module.exports = thoughtController;