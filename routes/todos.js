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

route.post('/todos', (req, res) => {
    const user = new User({
        Titel: req.body.Titel,
        Description: req.body.Description,
        Starting_date: req.body.Starting_date,
        End_date: req.body.password
    })
    user.save((err) =>{
        if(err) {
            res.render('/todos', {
                todo: todo,
                errorMessage: "Error creating username, try another user"
            })
        } else {
            res.redirect('/todos')
        }
    })
})


module.exports = route