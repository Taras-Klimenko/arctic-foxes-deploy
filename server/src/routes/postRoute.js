const postRouter = require('express').Router();
const PostController = require('../controllers/PostController');
const verifyAccessToken = require('../middleware/verifyAccessToken');

postRouter
  .get('/', verifyAccessToken, PostController.getAll)
  .get('/:id', PostController.getOne)
  .post('/', verifyAccessToken, PostController.create)
  .put('/:id', verifyAccessToken, PostController.update)
  .delete('/:id', verifyAccessToken, PostController.delete);

module.exports = postRouter;
