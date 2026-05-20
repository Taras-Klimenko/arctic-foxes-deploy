const taskRouter = require('express').Router();
const TaskController = require('../controllers/TaskController');
const verifyAccessToken = require('../middleware/verifyAccessToken');

taskRouter
  .get('/', verifyAccessToken, TaskController.getAll)
  .get('/:id', TaskController.getOne)
  .post('/', verifyAccessToken, TaskController.create)
  .put('/:id', verifyAccessToken, TaskController.update)
  .delete('/:id', verifyAccessToken, TaskController.delete);

module.exports = taskRouter;
