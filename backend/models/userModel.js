const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    phone : {
        type : String,
        required : true,
    },
    answer : {
        type : String,
        required : true
    },
    role : {
        type : Number,
        required : true
    }
},{timestamps : true})

const user = mongoose.model('users',userSchema);

module.exports = user;