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
    try {
        const user = (req.session.passport.user);
        const membership = await getMembership(user)
        if(membership){
            next();
        } else {
            //res.status(401).json({msg: 'you are not authorized to view this page'});
        }

    }
    catch {
        res.redirect('/posts')

    }
    
}

module.exports = {
    isAuth,
    isMember
};