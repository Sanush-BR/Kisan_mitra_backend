const mongoose = require('mongoose');

const Sector = mongoose.model('Sector',new mongoose.Schema({
    name:{
        type:String,
        maxlength:55,
        required:true
    }
}));

module.exports.Sector = Sector;