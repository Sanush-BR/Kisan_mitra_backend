const mongoose = require('mongoose');


const Loan = mongoose.model('Loan',new mongoose.Schema({
    provider:{
        type:String,
        maxlength:55,
        required:true
    },
    
    interest:{
        type:String,
        maxlength:30,
        required:true
    }

}));


module.exports.Loan = Loan;