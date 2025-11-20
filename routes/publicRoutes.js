const express = require('express');

const publicController = require('../controllers/publicController');
const userRoute = express();


userRoute.get('/', publicController.getHome);



module.exports = userRoute;