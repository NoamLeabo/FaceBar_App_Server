const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const User = new Schema({
    fName : {
        type : String,
        required : true
    },
    
    lName: {
        type : String,
        required : true
    },

    username : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    jwt : {
        type : String,
        default : 0
    },

    profileImg : {
        type : String
    }

});

module.exports = mongoose.model('User', User);