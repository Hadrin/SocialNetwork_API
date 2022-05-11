const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res){
        User.find()
        .populate('friends')
        .populate('thoughts')
        .then((users => res.json(users)));
    },
    getOneUser(req, res){
        User.findOne({ _id: req.params.userID })
        .populate('friends')
        .populate('thoughts')
        .then((user) => res.json(user));
    },
    createUser(req, res){
        User.create(req.body);
        res.sendStatus(200);
    },
    async updateUser(req, res){
        await User.findOneAndUpdate({
            _id: req.params.userID
        },{
            $set: req.body,
        },{
            runValidators: true,
            new: true,
        });
        res.sendStatus(200);
    },
    async deleteUser(req, res){
        await User.findOneAndDelete({
            _id: req.params.userID
        });
        res.sendStatus(200);
    },
    async addFriend(req, res){
        await User.findOneAndUpdate({
            _id: req.params.userID
        }, {
            $addToSet: { friends: req.params.friendID },
        },);
        res.sendStatus(200);
    },
    async removeFriend(req, res){
        await User.findOneAndUpdate({
            _id: req.params.userID
        }, {
            $pull: { friends: req.params.friendID },
        },);
        res.sendStatus(200);
    },

};

module.exports = userController;