const mongoose = require('mongoose');
const { types } = require('node-sass');
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')


const Cart = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, required: true},
    gender: {type: String, required: true},
    size: {type: String, required: true},
    colour: {type: String, required: true},
},{
    timestamps: true
})