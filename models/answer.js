const mongoose = require('mongoose');

var answer = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    host: String,
    question_id : String,
    answered_by: String,
    text: String,
    image_url: String
});

module.exports = mongoose.model('Answer', answer)