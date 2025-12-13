const express = require('express');

const postController = require('../controllers/postController.js');
const {isAuth, isMember} = require('../middleware/authMiddleware.js');
const postRoute = express();

postRoute.use(isAuth);
postRoute.use(isMember);

postRoute.get('secret');
postRoute.post('secret');

postRoute.post('/:id/comment/new', postController.postComment);
postRoute.post('/:postId/:commentId/delete', postController.deleteComment);

postRoute.get('/new', postController.getNewPost);
postRoute.post('/new', postController.postNewPost);

postRoute.get('/:id/edit', postController.getEditPost);
postRoute.post('/:id/edit', postController.postEditPost);

postRoute.delete('/:id/', postController.deletePost);

postRoute.get('/', postController.getDashboard);
postRoute.get('/:id/', postController.getPost);

module.exports = postRoute;