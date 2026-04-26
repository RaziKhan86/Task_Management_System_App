const { createTask, fetchAllTask, UpdateTaskbyId, DeleteTaskbyId } = require('../Controllers/TaskController');

const router = require('express').Router();

// To get all the tasks
router.get('/', fetchAllTask);
// To create a task
router.post('/',createTask);
// To update a task
router.put('/:id',UpdateTaskbyId);
// To delete a task
router.delete('/:id',DeleteTaskbyId);

module.exports = router;