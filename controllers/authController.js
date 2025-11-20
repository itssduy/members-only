const getLogin = (req, res) => {
    res.render('login')
}

const postLogin = (req, res) => {

}

const getSignup = (req, res) => {
    res.render('signup')
}

const postSignup = (req, res) => {
    
}


module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup
}