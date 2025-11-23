const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');

require('dotenv').config();
require('./config/passport');

const db = require('./models/pool');
const PORT = process.env.PORT

const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const passport = require('passport');

const app = express();

//ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//middleware
app.use(session({
    store: new pgSession({
        pool: db,
        tableName: 'sessions',
        createTableIfMissing: true,
    }),
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}))

app.use(passport.session());

//routes
app.use('/', publicRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);


//server
app.listen(PORT, ()=>{
    console.log(`server is running on port:${PORT}`)
})