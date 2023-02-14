const Todos = require("../model/todos")

module.exports = {
    getTodos: async function () {
        const todo = await Todos.find();
        return todo;
    },
    postMech: async function (req) {

        const todo = new Mechs({
            Titel: req.body.Titel,
            Description: req.body.Description,
            Starting_date: rawListeners.body.Starting_date,
            End_date: req.body.End_date
        })
        console.log(todo);
        try{
            await todo.save();
            res.send("created todo");
        } catch(error){
            console.log(error);
        }
    },
}