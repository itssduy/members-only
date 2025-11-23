const isAuth = (req, res, next)=>{

    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({msg: 'you are not authorized to view this page'});
    }
}


module.exports = isAuth;