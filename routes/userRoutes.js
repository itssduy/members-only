const express = require('express');

const userController = require('../controllers/userController');
const isAuth = require('../middleware/authMiddleware');
const userRoute = express();

userRoute.use(isAuth);

userRoute.get('/', userController.getDashboard);



module.exports = userRoute;