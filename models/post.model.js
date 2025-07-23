const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        trim : true
    },

    body : {
        type : String,
        required: true,
        trim : true
    },

    image : {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",       
        required: true
    }
}, {timestamps:true});


module.exports = mongoose.model('Post', postSchema);