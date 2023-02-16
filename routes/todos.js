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
            // Make date readable
            // for(let todo of todos){
            //     todo.startDate = todo.startDate.toLocaleString();
            // }
            res.render('todos/index', {todos: todos, user:foundUser.username})
        }else{
            res.render('todos/index', {errorMessage: "No todos"})
        }
    }else{
        // Get all active todos:
        res.render('todos/index', {errorMessage:"No active todos"})
    }
})

// Create new todo form
route.get('/new', cookieJwtAuth, async(req, res)=>{
    const foundUser = await User.findOne({username: req.user.username})
    res.render('todos/new', {user:foundUser.username})
})

// Create new todo post req
route.post('/new', cookieJwtAuth, async (req, res)=>{
    // Validering
    // if(req.body.dateStart == undefined){
    //     req.body.dateStart = new Date().toISOString();
    // }
    // Find user id from db
    try {
        const foundUser = await User.findOne({username: req.user.username})

        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.dateStart,
            deadline: req.body.deadline,
            done: req.body.done,
            user: foundUser.id
        })
        try {
            await todo.save((err) =>{
                res.redirect('/todos')
            })
        } catch (error) {
            res.render('todos/new', {errorMessage: error, todo, user:req.user.username})
        }
    } catch (error) {
        console.error(error);
    }
})


module.exports = route