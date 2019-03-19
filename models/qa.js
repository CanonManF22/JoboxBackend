const mongoose = require('mongoose');

var qaSession = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    host: Number,
    start_time: Number,
    end_time: Number,
    asked_by: String,
    answered_by: String,
    text: String,
    answer: String,

});

module.exports = mongoose.model('QA', qaSession)