const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('User went to to do list page');
    res.render('to_do_list')
})

module.exports = router