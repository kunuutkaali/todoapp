const router = require('express').Router()
const authorize = require('../middleware/authorize')


router.get('/', authorize, (req, res) => {
    res.render('index', { title:"Frontpage", user: "Exampel data" } ) 
})
 
module.exports = router