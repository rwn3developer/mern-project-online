const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    slug : {
        type : String,
        lowercase : true
    }
   
})

const category = mongoose.model('category',categorySchema);

module.exports = category;