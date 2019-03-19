const mongoose = require('mongoose');

var question = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    host: Number,
    start_time: Number,
    end_time: Number,
    asked_by: String,
    text: String
});

module.exports = mongoose.model('Question', question)