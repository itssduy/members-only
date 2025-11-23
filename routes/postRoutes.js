const express = require('express');

const postController = require('../controllers/postController.js');
const isAuth = require('../middleware/authMiddleware.js');
const postRoute = express();

postRoute.get('/', postController.getDashboard);

postRoute.get('/new', isAuth, postController.getNewPost);
postRoute.post('/new', isAuth, postController.postNewPost);

postRoute.get('/:id/edit', isAuth, postController.getEditPost);
postRoute.post('/:id/edit', isAuth, postController.postEditPost);

postRoute.get('/:id', postController.getPost);
postRoute.delete('/:id', isAuth, postController.deletePost);

module.exports = postRoute;