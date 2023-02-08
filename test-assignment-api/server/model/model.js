const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone_number : {
        type : String,
        required: true
    },
})

const Studentdb = mongoose.model('studentdb', schema);

module.exports = Studentdb;