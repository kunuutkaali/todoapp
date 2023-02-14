// All todos gets, posts, Deletes goes here
const route = require('express').Router();// All user gets posts Deletes goes here
const Todo = require('../models/todo')
const db = require('../db')

route.get('/', (req, res)=>{
    res.render('todos/index')
})

route.get('/new', (req, res)=>{
    res.render('todos/new')
})

route.post('/new', (req, res)=>{
    // validering
    // gemme i databa
    res.render('todos/new')
})


module.exports = route