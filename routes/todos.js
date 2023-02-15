// All todos gets, posts, Deletes goes here
const route = require('express').Router();// All user gets posts Deletes goes here
const Todo = require('../models/todo')
const User = require('../models/user')
const db = require('../db')
const cookieJwtAuth = require('../middleware/cookieJwtAuth')

route.get('/', cookieJwtAuth, async(req, res)=>{
    const foundUser = await User.findOne({username: req.user.username})
    if(foundUser){
        const todos = await Todo.find({user:foundUser.id})
        if(todos){
            res.render('todos/index', {todos: todos})
        }else{
            res.render('todos/index', {errorMessage: "No todos"})
        }
    }else{
        // Get all active todos:
        res.render('todos/index', {errorMessage:"No active todos"})
    }
})

// Create new todo form
route.get('/new', cookieJwtAuth, (req, res)=>{
    res.render('todos/new')
})

// Create new todo post req
route.post('/new', cookieJwtAuth, async (req, res)=>{
    // Validering

    // Find user id from db
    try {
        const foundUser = await User.findOne({username: req.user.username})
        // 
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            deadline: req.body.deadline,
            done: req.body.done,
            user: foundUser.id
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
    } catch (error) {
        console.error(error);
    }
})


module.exports = route