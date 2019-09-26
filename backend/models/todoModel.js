const mongoose = require("mongoose");
const Lists = require('./listModel');
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    marked: {
        type: Boolean,
        default: false
    },
 dueDate:{
    type: Date,

},
    list:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Lists'
        } 
    
})


module.exports = mongoose.model("Todo", todoSchema)