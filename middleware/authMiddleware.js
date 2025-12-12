const {getMembership} =  require('../models/query')

const isAuth = (req, res, next)=>{

    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/auth/login')
        //res.status(401).json({msg: 'you are not authorized to view this page'});
    }
}


const isMember = async (req, res, next)=>{
    const membership = await getMembership(req.session.passport.user)
    if(membership){
            next();
    } else {
        res.redirect('/auth/login')
        //res.status(401).json({msg: 'you are not authorized to view this page'});
    }
}

module.exports = {
    isAuth,
    isMember
};