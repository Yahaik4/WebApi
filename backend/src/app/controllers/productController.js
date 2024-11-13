const mongoose = require('../../util/mongoose')
const {mongooseToOject} = require("../../util/mongoose")
const { Error } = require('mongoose')
const Product = require('../models/Product')
const Category = require('../models/Category')
const {mutipleMongooseToOject} = require('../../util/mongoose')
const path = require('path')
const fs = require('fs')
const { error } = require('console')

class productsController{

    async Show(req, res, next){
        
        try{
            const {category} = req.query
            // const currentURL = req.originalUrl
            
            const categories = await Category.find({})
            let products

            if(category == null || category == 'All'){
                products = await Product.find({})
            }else{
                products = await Product.find({category: category})
            }
            

            res.status(200).json({
                products:mutipleMongooseToOject(products),
                categories:mutipleMongooseToOject(categories),
                selectedCategory: category || '',
            })
        }catch(error){
            next(error)
        }    
    }

    // [GET] /create
    async createPage(req, res, next){
        await Category.find({})
            .then(categories => {
                res.status(200).json({
                    categories:mutipleMongooseToOject(categories)
                })
            })
        .catch(error => next(error))
    }

    // [POST] /create
    create(req, res, next){
        // const {name,gender,size,colour,price,category,sold,stock,des ,image} = req.body
        const {size, colour} = req.body
        const fileImage = 'http://localhost:3000/img/products/' + req.file.filename
        const sizeArray = size.split(',').map(s => s.trim())
        const colourArray = colour.split(',').map(s => s.trim())
        const product = new Product(req.body)
        
        product.size = sizeArray
        product.colour = colourArray
        product.image = fileImage

        product.save()
            .then(() => {
                res.status(200).json({msg: 'Product created successfully!'})
            }).catch(error => {
                next(error)
            })
    }

    // [GET] / product/:slug
    showbySlug(req, res, next){
        Product.findOne({slug: req.params.slug})
            .then((product) => {
                res.status(200).json({...product})
            })
            .catch(err => {
                res.status(500).json({Error: err})
            })
    }

    // [GET] /edit/:id
    async editPage(req, res, next){
        
        try{
            const [product, categories] = await Promise.all([
                Product.findById(req.params.id),
                Category.find({})
            ])

            
            res.status(200).json({
                product: mongooseToOject(product),
                categories:mutipleMongooseToOject(categories)
            })

        }catch (error) {
            next(console.log(error));
        }

    }

    // [PUT] /edit/:id
    edit(req, res, next) {
        const updates = req.body;
        
        if (req.file) {
            const newImg = req.file.filename;
    
            Product.findById(req.params.id)
                .then(product => {
                    if (product.image) {
                        const oldImagePath = path.join(__dirname, '..', 'public', 'img', 'product', product.image);
                        fs.unlink(oldImagePath, err => {
                            if (err) console.error(err);
                        });
                    }
            
                    updates.image = 'http://localhost:3000/img/products/' + newImg;
    
                    return Product.updateOne({ _id: req.params.id }, updates);
                })
                .then(() => {
                    res.status(200).json({msg: 'Product edited successfully'})
                })
                .catch(next);
        } else {
            Product.updateOne({ _id: req.params.id }, updates)
                .then(() => {
                    res.status(200).json({msg: 'Product edited successfully'})
                })
                .catch(next);
        }
    }
    

    // [DELETE] /product/:id
    delete(req, res, next){        
        Product.deleteOne({_id: req.params.id})
            .then(() => {
                res.status(200).json({msg: 'Product deleted successfully!'})
            })
            .catch(error => console.log(error))
    }

    deleteAll(req, res, next){    

        if (!req.body.id) {
            return res.status(400).json({ msg: 'Không có ID nào được gửi' });
        }
    
        const listId = req.body.id.split(',');
    
        Promise.all(listId.map(id => Product.deleteOne({ _id: id })))
            .then(() => {
                return res.status(200).json({ msg: 'Products deleted successfully!' });
            })
            .catch(err => {
                console.error('Error deleting products:', err);
                return res.status(500).json({ msg: 'Error deleting products:' });
            });
    }

}

module.exports = new productsController