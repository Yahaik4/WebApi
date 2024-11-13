const mongoose = require('mongoose');
// const { types } = require('node-sass');
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')

const categorySchema = new Schema({
    name: {type: String, required: true},
})

module.exports = mongoose.model('categories', categorySchema)
