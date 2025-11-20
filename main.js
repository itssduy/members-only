const express = require('express');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT

const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

//ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

//routes
app.use('/', publicRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);


//server
app.listen(PORT, ()=>{
    console.log(`server is running on port:${PORT}`)
})