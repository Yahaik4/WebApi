function auth(req, res, next){
    
    const userId1 = req.headers?.userid?.split('userId=')[1] || req.cookies?.userId
    
    if(!userId1){
        return res.status(403).json({ msg: 'Please log in to access this page' });
    }
    next()
}

module.exports = auth