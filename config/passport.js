
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validPassword }  = require('../lib/passwordUtils');
const pool = require('../models/pool');


const userFields = {
    usernameField: 'username',
    passwordField: 'password'
}

const verifyCallback = (username, password, done) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err){
            return done(err);
        }
        if(result.rows.length > 0) {
            const user = result.rows[0];

            const isValid = validPassword(password, user.hash, user.salt);
            if(isValid){
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        }
        else {
            return done(null, false);
        }
    });
}

const strategy = new LocalStrategy(userFields, verifyCallback);

passport.use(strategy);

module.exports = passport;


passport.serializeUser((user, done) => {

})

passport.deserializeUser((user, done) => {

})