const express = require('express');

const authController = require('../controllers/authController');

const authRoute = express();


authRoute.get('/login', authController.getLogin);
authRoute.post('/login', authController.postLogin);


authRoute.get('/signup', authController.getSignup);
authRoute.post('/signup', authController.postSignup);






module.exports = authRoute;