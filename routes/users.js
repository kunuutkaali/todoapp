// All user gets posts Deletes goes here
const route = require('express').Router()
const User = require('../models/user')
const db = require('../db')
const bcrypt = require('bcryptjs')

route.get('/', (req, res)=>{
    res.render('users/index')
})

route.get('/register', (req, res)=>{
    res.render('users/register', {user: new User()})
})
// this handles when there is register post request
route.post('/register', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save((err) =>{
        if(err) {
            res.render('users/register', {
                user: user,
                errorMessage: "Error creating username, try another user"
            })
        } else {
            res.redirect('/')
        }
    })
})

route.get('/login', (req, res)=>{
    const user = new User()
    res.render('users/login', {user: user})
})

// this handles when there is login post request
route.post('/login', async (req, res)=>{
    // When users try to login
    const user = new User({
        username: req.body.username,
        password: req.body.username
    })
    try {
        const user = await user.findOne({username:username})
        res.render('users/login', {user: user})
    } catch(err) {
        res.render('users/login', {user: user})
    }
    res.send(user)
    res.render('users/login', {user: user})
})


module.exports = route