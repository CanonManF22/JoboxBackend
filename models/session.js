const mongoose = require('mongoose');

var qaSession = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    host_id: Number,
    start_time: String,
    end_time: String
});

module.exports = mongoose.model('QASession', qaSession)