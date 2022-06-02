const mongoose = require('mongoose');


const Scheme = mongoose.model('Scheme',new mongoose.Schema({
    name: {
        type: String,
        maxlength:256,
        required: true
    },
    link: {
        type: String,
        maxlength: 256,
        required: true
    }
}));


module.exports.Scheme = Scheme;