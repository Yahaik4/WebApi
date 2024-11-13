class siteController{

    
    // GET / 
    home(req, res, next){
       res.render('home')
    }

    loginPage(req, res){
        res.render('login', {layout: 'loginLayout', err: null})
    }

    // [POST]
    // async handleLogin(req, res){

    //     try{
    //         const {email, password} = req.body
    
    //         const user = await User.findOne({email: email})

    //         if(!user){
    //             return res.status(401).json({error: 'Incorrect email or password'})
    //         }
    
    //         if(bcrypt.compareSync(password, user.password)){
            
    //             // req.session.user = user
    //             return res.status(200).json({message: 'Login successful'})    
    //         }
            
    //         else{
    //             return res.status(401).json({error: 'Incorrect email or password'})
    //         }

    //     }catch(error){
    //         return res.status(500).json({error: 'An error occurred during login'})
    //     }
    // }

    registerPage(req, res){
        res.render('register', {layout: 'loginLayout', err: null})
    }

    // async createAccout(req, res){
        
    //     try{
    //         const {name, email, password} = req.body

    //         const user = await User.findOne({email: email})
    //         if(user){
    //             return res.status(409).json({error: 'Email already exists'})
    //         }else{
    //             bcrypt.hash(password, 10, (err,hash) => {
    //                 if (err) {
    //                     return res.status(500).json({ error: 'Error hashing password' })
    //                 }
    //                 const accout = new User({...req.body, password: hash})
    //                 accout.save()
                    
    //                 return res.status(201).json({ message: 'Account created successfully, please login'})
    //             })
    //         }
    //     }catch  (err){
    //         console.log(err)
    //         return res.status(500).json({ error: 'An error occurred during registration' });
    //     }
    // }

}

module.exports = new siteController;