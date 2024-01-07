const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://xyz:xyz%40123@cluster0.9ljjkuw.mongodb.net/todos");

const todoSchema = mongoose.Schema({
    title: String,
    description : String,
    completed : Boolean

})

const todo = mongoose.model('todos',todoSchema);

module.exports ={
    todo
}
