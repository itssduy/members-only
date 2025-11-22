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

const postSignup = async (req, res) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const user = await pool.query('SELECT * FROM users WHERE username=$1', [req.body.username]);
    if(user.rows.length > 0){
        res.send('duplicate')
        return;
    }
    pool.query('INSERT INTO users(username, salt, hash) VALUES ($1, $2, $3)', [req.body.username, salt, hash]), (err, result) => {
        if (err) {
            return res.status(500).send('Error creating user');
        }
    }

    res.redirect('/auth/login');
}


module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup
}