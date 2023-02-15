// All todos gets, posts, Deletes goes here
const route = require('express').Router();
const Todo = require('../models/todos');
const db = require('../db');


route.get('/', (req, res)=>{
    res.render('todos/index')
})

route.get('/new', (req, res)=>{
    res.render('todos/new')
})

/*route.post('/new', async (req, res) => {
    try {
        if(Starting_date<End_date){
            console.log('time error')
            return
        }
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
    } catch (error) {
        res.render('todos/new', {errorMessage: error, todo})
    }

})*/

route.post('/new', async (req,res) => {
    var Start_date = req.body.Starting_date
    var date_end = req.body.End_date
    try {
        if(Start_date>date_end){
            console.log('time error')
            return
        } else {
            const todo = new Todo({
                Titel: req.body.Titel,
                Description: req.body.Description,
                Starting_date: Start_date,
                End_date: date_end
            })
            try {
                await todo.save((err) => {
                    console.error(err)
                    res.render('/todos/new', {errorMessage: err, todo})
                })
                res.redirect('/todos')
            } catch (error) {
                res.render('todos/new', {errorMessage: error, todo})
            }
        }
       
    } catch (error) {
        console.error(error);
    }
})

module.exports = route
