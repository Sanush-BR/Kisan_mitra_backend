const mongoose = require('mongoose');

const Farmer = mongoose.model('Farmer',new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    crop:{
        type:String,
        required:true,
        minlength:3,
        maxlength:10
    },
    place:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    contact:{
        type:String,
        required:true,
        maxlength:256
    }
}));


module.exports.Farmer = Farmer;