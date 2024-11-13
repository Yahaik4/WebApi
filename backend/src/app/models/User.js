const mongoose = require('mongoose');
// const { types } = require('node-sass');
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: false},
},{
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)