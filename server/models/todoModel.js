const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    // _id:{
    //     type: String,
    //     required: true,  
    // },
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: false,
        trim: true
    },
    complated:{
        type: Boolean,
        default: false
    }
},{collection:"Todo", timestamps:true});

const todo = mongoose.model("Todo", todoSchema);
module.exports = todo;