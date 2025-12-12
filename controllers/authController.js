const { genPassword } = require("../lib/passwordUtils")
const pool = require("../models/pool")

const getLogin = (req, res) => {
    res.render('auth/login')
}

const postLogin = (req, res) => {
    
}

const getSignup = (req, res) => {
    res.render('auth/signup')
}

const postSignup = async (req, res) => {
    const {username, firstName, lastName, email} = req.body;

    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if(user.rows.length > 0){
        res.send('This username already exists')
        return;
    }
    pool.query('INSERT INTO users(username, first_name, last_name, email, salt, hash) VALUES ($1, $2, $3, $4, $5, $6)', [username, firstName, lastName, email, salt, hash]), (err, result) => {
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