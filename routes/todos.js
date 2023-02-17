// All todos gets, posts, Deletes goes here
const route = require('express').Router();// All user gets posts Deletes goes here
const Todo = require('../models/todo')
const User = require('../models/user')
require('../db')

route.get('/', async(req, res)=>{
    const foundUser = await User.find({username: req.user.username})
    if(foundUser){
        let now = new Date()
        const active = await Todo.find({user:foundUser, deadline: { $gt: now }, startDate: { $lt: now }})
        const future = await Todo.find({user:foundUser, deadline: { $gt: now }, startDate: { $gt: now }})
        const dead = await Todo.find({user:foundUser, deadline: { $lt: now }})
        if(
            active.length == 0 && 
            dead.length == 0 &&
            future.length == 0
            ){
            res.render('todos/index', {errorMessage: "No todos", user:req.user})
        }else{
            res.render('todos/index', {active: active, dead:dead, future:future, user:req.user})
        }
    }else{
        // Finding user in db error
        res.render('todos/index', {errorMessage:"No user found!"})
    }
})

// Create new todo form
route.get('/new', async(req, res)=>{
    res.render('todos/new', {user:req.user})
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
            user: foundUser
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
// Update todo status to done
route.post('/todo', async (req, res)=>{
    const foundUser = await User.find({username: req.user.username})
    const query = {_id:req.body.id}
    const foundTodo = await Todo.findOne(query)
    if(foundTodo.done == false){
        await Todo.findOneAndUpdate(query, { $set: { done: true }})
        res.redirect("/todos")
    }else{
        if(await Todo.findOneAndUpdate(query, { $set: { done: false }})){
            res.redirect("/todos") 
        }
    }
})


module.exports = route