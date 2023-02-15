// All todos gets, posts, Deletes goes here
const route = require('express').Router();

route.get('/', (req, res)=>{
    res.render('todos/index')
})

route.get('/new', (req, res)=>{
    res.render('todos/new')
})

route.post('/new', (req, res)=>{
    res.render('todos/new')
})

route.post('/new', (req, res) => {
    const todo = new Todo({
        Titel: req.body.Titel,
        Description: req.body.Description,
        Starting_date: req.body.Starting_date,
        End_date: req.body.password
    })
    todo.save((err) =>{
        if(err) {
            res.render('/todos/new', {
                todo: todo,
                errorMessage: "Error creating todo try again"
            })
        } else {
            res.redirect('/todos')
        }
    })
})


module.exports = route