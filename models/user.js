const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String
});

module.exports = mongoose.model('User', userSchema)