const router = require('express').Router();

router.use('/' , require('./user'))
router.use('/' , require('./tasks'))
router.use('/auth',require('./auth'))
module.exports = router