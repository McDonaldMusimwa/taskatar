const router = require('express').Router();
const taskObject = require('../controller/tasks')


router.post('/task',taskObject.createTask);



module.exports = router;