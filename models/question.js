const mongoose = require('mongoose');

var question = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    session_id: String,
    asked_by: String,
    text: String
});

module.exports = mongoose.model('Question', question)