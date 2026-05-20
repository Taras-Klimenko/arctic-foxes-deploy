const apiRouter = require('express').Router();
const taskRouter = require('./taskRoute');
const postRouter = require('./postRoute');
const authRouter = require('./authRoute');
const aiRouter = require('./aiRoute');
const formatResponse = require('../utils/formatResponse');

apiRouter.use('/tasks', taskRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/ai', aiRouter);

apiRouter.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Ресурс не найден'));
});

module.exports = apiRouter;
