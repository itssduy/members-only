const express = require('express');

const postController = require('../controllers/postController.js');
const {isAuth, isMember} = require('../middleware/authMiddleware.js');
const postRoute = express();

postRoute.use(isAuth);
postRoute.use(isMember);

postRoute.get('/new', isAuth, postController.getNewPost);
postRoute.post('/new', isAuth, postController.postNewPost);

postRoute.get('/:id/edit', isAuth, postController.getEditPost);
postRoute.post('/:id/edit', isAuth, postController.postEditPost);

postRoute.delete('/:id', isAuth, postController.deletePost);

postRoute.get('/', postController.getDashboard);
postRoute.get('/:id', postController.getPost);

module.exports = postRoute;