const router = require('express').Router()


router.get('/', (req, res) => {
    console.log('User went to frontpage');
    res.render('index', { title:"Frontpage" } ) 
})
 
module.exports = router