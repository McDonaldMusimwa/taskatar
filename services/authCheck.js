

function AuthenticationCheck(res,req,next){
    if(!req.userId){
        res.status(401)
    }else if(req.userId){
        next()
    }
}

module.exports = AuthenticationCheck