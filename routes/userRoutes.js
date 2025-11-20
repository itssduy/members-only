const express = require('express');

const userController = require('../controllers/userController');
const userRoute = express();


userRoute.get('/', userController.getDashboard);



module.exports = userRoute;