// All todos gets, posts, Deletes goes here
const route = require('express').Router();// All user gets posts Deletes goes here
const Todo = require('../models/todo')
const User = require('../models/user')
const db = require('../db')

route.get('/', async(req, res)=>{
    const foundUser = await User.findOne({username: req.user.username})
    if(foundUser){
        let now = new Date()
        const active = await Todo.find({user:foundUser.id, deadline: { $gt: now }, startDate: { $lt: now }}).sort({ deadline: -1 })
        const future = await Todo.find({user:foundUser.id, deadline: { $gt: now }, startDate: { $gt: now }}).sort({ deadline: -1 })
        const dead = await Todo.find({user:foundUser.id, deadline: { $lt: now }})
        if(
            active.length == 0 && 
            dead.length == 0 &&
            future.length == 0
            ){
            res.render('todos/index', {errorMessage: "No todos"})
        }else{
            res.render('todos/index', {active: active, dead:dead, future:future, user:foundUser.username})
        }
    }else{
        // Finding user in db error
        res.render('todos/index', {errorMessage:"No user found!"})
    }
})

// Create new todo form
route.get('/new', async(req, res)=>{
    const foundUser = await User.findOne({username: req.user.username})
    res.render('todos/new', {user:foundUser.username})
})

// Create new todo post req
route.post('/new', async (req, res)=>{
    // Validering
    try {
        const foundUser = await User.findOne({username: req.user.username})

        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            deadline: req.body.deadline,
            done: req.body.done,
            user: foundUser.id
        })
        try {
            await todo.save()
            if(todo){
                res.redirect('/todos')
            }else{
                res.render('todos/new', {errorMessage: todo, todo, user:req.user.username})
            }
        } catch (error) {
            res.render('todos/new', {errorMessage: error, todo, user:req.user.username})
        }
    } catch (error) {
        console.error(error);
    }
})


module.exports = route