const express = require('express');
const isAuth = require('../middleware/authMiddleware.js');

const publicController = require('../controllers/publicController');
const publicRoute = express();


publicRoute.get('/', publicController.getHome);



module.exports = publicRoute;