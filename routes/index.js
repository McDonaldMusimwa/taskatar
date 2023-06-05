const router = require('express').Router();

router.use('/' ,(req,res)=>{
    res.send('welcome')
})
module.exports = router