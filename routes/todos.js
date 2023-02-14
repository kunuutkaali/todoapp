// All todos gets, posts, Deletes goes here
const route = require('express').Router();

route.get('/', (req, res)=>{
    res.render('todo/index')
})

route.get('/new', (req, res)=>{
    res.render('todo/new')
})

route.post('/new', (req, res)=>{
    res.render('todo/new')
})
module.exports = route