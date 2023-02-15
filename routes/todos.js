// All todos gets, posts, Deletes goes here
const route = require('express').Router();
const db = require('../db');

route.get('/', (req, res)=>{
    res.render('todos/index')
})

route.get('/new', (req, res)=>{
    res.render('todos/new')
})

route.post('/new', (req, res)=>{
    res.render('todos/new')
})

route.post('/new', async (req, res) => {
    const todo = new Todo({
        Titel: req.body.Titel,
        Description: req.body.Description,
        Starting_date: req.body.Starting_date,
        End_date: req.body.End_date
    })
    try {
        await todo.save((err) =>{
            console.error(err)
            res.render('/todos/new', {errorMessage: err, todo})
        })
        res.redirect('/todos')
    } catch (error) {
        res.render('todos/new', {errorMessage: error, todo})
    }

})

module.exports = route