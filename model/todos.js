const mongoose = require('mongoose')

const todos = mongoose.Schema({
    Titel: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Starting_date: {
        type: Date,
        required: true
    },
    End_date: {
        type: Date,
        required: true
    }
})

const Todos = mongoose.model("todos", todos)
module.exports = Todos;