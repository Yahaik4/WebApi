
class usersController{

    // GET / [show]
    async Show(req, res, next){
        
        const response = await fetch('http://backend:3000/account', {
            method: 'GET',
            headers: {
                'userId': `${req.headers?.cookie}`
            },
        })
        const result = await response.json();
        const {users} = result;    
        res.render('Accounts/show', {users})
    }

    // GET/ profile/:id
    showProfile(req, res, next){
        User.findById(req.params.id)
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(400).json({Error: err})
            })
    }

}


module.exports = new usersController;