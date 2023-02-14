// All user gets posts Deletes goes here
const route = require('express').Router();

route.get('/', (req, res)=>{
    res.render('users/index')
})

route.get('/register', (req, res)=>{
    res.render('users/register')
})
// this handles when there is register post request
route.post('/register', (req, res) => {
    const user = {user: {
        username: req.body.username
    }}
    res.render('users/register', {user:user})
})

route.get('/login', (req, res)=>{
    res.render('users/login')
})

// this handles when there is login post request
route.post('/login', (req, res)=>{
    res.render('users/login')
})


module.exports = route