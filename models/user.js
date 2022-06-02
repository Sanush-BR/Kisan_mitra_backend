const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id , isAdmin: this.isAdmin , name:this.name } , process.env.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User' , userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    });
    return schema.validate(user);
}

module.exports.validate = validateUser;
module.exports.User = User;