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


module.exports = route