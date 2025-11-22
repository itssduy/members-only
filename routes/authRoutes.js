const express = require('express');

const authController = require('../controllers/authController');

const passport = require('passport');
const authRoute = express();


authRoute.get('/login', authController.getLogin);
authRoute.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login', successRedirect: '/users'}));


authRoute.get('/signup', authController.getSignup);
authRoute.post('/signup', authController.postSignup);






module.exports = authRoute;