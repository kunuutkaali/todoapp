const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('User went to create account page');
    res.render('createAcount')
})

module.exports = router