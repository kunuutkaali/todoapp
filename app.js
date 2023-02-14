const express = require('express')
require('dotenv').config();
var path = require('path');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
const indexRouter = require('./routes/index')
const userRoute = require('./routes/users')
const todoRoute = require('./routes/todos')

// To pass data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Allow static files
app.use(express.static(path.join(__dirname, "public")))

app.use('/users', userRoute)
app.use('/todos', todoRoute)

// Index router / frontpage
app.get('/', indexRouter)


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })