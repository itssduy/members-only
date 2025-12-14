const express = require('express');

const postController = require('../controllers/postController.js');
const {isAuth, isMember} = require('../middleware/authMiddleware.js');
const postRoute = express();

postRoute.get('/secret', postController.getSecret);
postRoute.post('/secret', postController.postSecret);

postRoute.use(isMember);

postRoute.post('/:id/comment/new', isAuth, postController.postComment);
postRoute.post('/:postId/:commentId/delete', isAuth, postController.deleteComment);

postRoute.get('/new', isAuth, postController.getNewPost);
postRoute.post('/new', isAuth, postController.postNewPost);

postRoute.get('/:id/edit', isAuth, postController.getEditPost);
postRoute.post('/:id/edit', isAuth, postController.postEditPost);

postRoute.delete('/:id/', isAuth, postController.deletePost);

postRoute.get('/', postController.getDashboard);
postRoute.get('/:id/', postController.getPost);

module.exports = postRoute;