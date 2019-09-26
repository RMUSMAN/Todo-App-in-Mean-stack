const mongoose = require("mongoose");
const Todo = require('./todoModel');
const listSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    todos:[ {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }]
})


module.exports = mongoose.model('Lists', listSchema);