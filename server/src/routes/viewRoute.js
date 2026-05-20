const viewRouter = require('express').Router();
const TaskController = require('../controllers/TaskController');

viewRouter.get('/', TaskController.viewTasksPage);

module.exports = viewRouter;
