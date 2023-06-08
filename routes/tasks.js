const router = require('express').Router();
const taskObject = require('../controller/tasks')


router.post('/task/:userId',taskObject.createTask);
router.get('/tasks/:userId',taskObject.getAllTasks);
router.get('/user/:userId/task/:taskId',taskObject.getTask);
router.patch('/user/:userId/task/:taskId',taskObject.modifyTask);
router.delete('/user/:userId/task/:taskId',taskObject.deleteTask);



module.exports = router;