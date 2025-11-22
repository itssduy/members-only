const { genPassword } = require("../lib/passwordUtils")
const pool = require("../models/pool")

const getLogin = (req, res) => {
    res.render('login')
}

const postLogin = (req, res) => {

}

const getSignup = (req, res) => {
    res.render('signup')
}

const postSignup = (req, res) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    pool.query('INSERT INTO users(username, salt, hash) VALUES ($1, $2, $3)', [req.body.username, salt, hash]), (err, result) => {
        if (err) {
            return res.status(500).send('Error creating user');
        }
    }

    res.redirect('/login');
}


module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup
}