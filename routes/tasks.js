const router = require('express').Router();
const taskObject = require('../controller/tasks')


router.post('/task/:userId',taskObject.createTask);
router.get('/task/:userId',taskObject.getAllTasks);
router.get('/task/:taskId',taskObject.getTask);
router.patch('/task/:taskId',taskObject.modifyTask);
router.delete('/task/:taskId',taskObject.deleteTask);



module.exports = router;