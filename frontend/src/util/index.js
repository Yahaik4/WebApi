function handle_auth(req, res, next){
    if(!req.cookies?.userId){
        return res.redirect('/login')
    }
    
    next()
}

module.exports = handle_auth