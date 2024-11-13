const mongoose = require('mongoose');
// const { types } = require('node-sass');
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')

const productSchema = new Schema({
    name: {type: String, required: true},
    sold: {type: Number, require: true},
    stock: {type: Number, require: true},
    gender: {type: String, required: true},
    size: [{type: String, required: true}],
    colour: [{type: String, required: true}],
    price: {type: String, required: true},
    image: {type: String, require:true},
    category: {type: String, require: true},
    des: {type: String},
    slug: {type: String}
},{
    timestamps: true
})


productSchema.pre('save', function(next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = this.name.toString().toLowerCase()
            .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
            .replace(/[^\w\-]+/g, '') // Loại bỏ các ký tự không phải chữ và số hoặc dấu gạch ngang
            .replace(/\-\-+/g, '-') // Thay nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
            .replace(/^-+/, '') // Loại bỏ dấu gạch ngang ở đầu chuỗi
            .replace(/-+$/, ''); // Loại bỏ dấu gạch ngang ở cuối chuỗi
    }
    next();
});

module.exports = mongoose.model('products', productSchema)
