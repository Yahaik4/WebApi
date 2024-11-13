const User = require('../models/User')
const {mutipleMongooseToOject} = require("../../util/mongoose")
const bcrypt = require('bcryptjs');

class siteController{

    
    // GET / 
    home(req, res, next){
        // await Course.find({})
        //     .then(courses => {
        //         console.log(courses)
        //         res.json(courses);
        //     })
        //     .catch(err => {
        //         res.status(400).json({ error: err });
        //     });
        
        // Course.find({})
        //     .then(courses => {
        //         res.render('home', { 
        //             courses:mutipleMongooseToOject(courses)
        //          })
        //     })
        //     .catch(error => next(error));
        return res.render('home');
        next()
    }

    loginPage(req, res){
        res.render('login', {layout: 'loginLayout', err: null})
    }

    // [POST]
    async handleLogin(req, res){

        try{
            const {email, password} = req.body
            const user = await User.findOne({email: email})

            if(!user){
                return res.status(404).json({msg: 'Not found'})
            }
    
            if(!bcrypt.compareSync(password, user.password)){
    
                return res.status(401).json({msg: 'Wrong password'})
            }
            
            else{

                // req.session.user = user
                res.cookie('userId', user._id, {
                    httpOnly: true,
                    secure: false, 
                    sameSite: 'lax', 
                    maxAge: 24 * 60 * 60 * 1000, 
                })

                return res.status(200).json({msg: 'Login Success'})

            }

        }catch(error){
            return res.status(500).send('An error occurred during login')
        }
    }

    registerPage(req, res){
        res.render('register', {layout: 'loginLayout', err: null})
    }

    async createAccout(req, res){
        
        try{
            const {name, email, password} = req.body

            const user = await User.findOne({email: email})
            if(user){
                return res.status(401).json({msg: 'Email already exists'})
            }else{
                bcrypt.hash(password, 10, (err,hash) => {
                    if (err) {
                        throw err
                    }
                    const accout = new User({...req.body, password: hash})
                    accout.save()
                        .then(() => res.status(200).json({msg: 'Register Success'}))
                        .catch(error => {
                            res.send(error)
                        })   
                })
            }
        }catch  (err){
            console.log(err)
            return res.status(500).send('An error occurred during login')
        }
    }

}

module.exports = new siteController;