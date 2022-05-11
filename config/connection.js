const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SocialNetwork_API');

module.exports = mongoose.connection;