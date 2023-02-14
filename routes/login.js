const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('User went to loginpage');
    res.render('login')
})

module.exports = router