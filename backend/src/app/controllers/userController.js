const mongoose = require('../../util/mongoose')
const {mongooseToOject} = require("../../util/mongoose")
const { Error } = require('mongoose')
const User = require('../models/User')
const {mutipleMongooseToOject} = require('../../util/mongoose')
const { error } = require('console')

class usersController{

    // GET / [show]
    async Show(req, res, next){
        await User.find({})
            .then(users => {    
                res.status(200).json({
                    users: mutipleMongooseToOject(users)
                })
            })
            .catch(error => next(error))
    }

    // GET/ profile/:id
    showProfile(req, res, next){
        User.findById(req.params.id)
            .then((user) => {
                res.status(200).json({...user})
            })
            .catch(err => {
                res.status(400).json({Error: err})
            })
    }

    // GET / [Edit]
    

    // [Edit] / user/:id
    edit(req, res, next){
        User.findById(req.params.id)
            .then((user) => {
                res.render('')
            })
            .catch(next)
    }

}


module.exports = new usersController;