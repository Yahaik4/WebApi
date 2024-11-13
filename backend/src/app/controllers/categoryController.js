const Categories = require('../models/Category')
const {mongooseToOject} = require("../../util/mongoose")
const mongoose = require('../../util/mongoose');
const { search } = require('./siteController');
// const { render } = require('node-sass');
const {mutipleMongooseToOject} = require('../../util/mongoose')
const {redis} = require('../../config/redis')

class categoriesController{
    async Show(req, res, next){
        const categories = await redis.get('categories');

        if(categories){
            return res.status(200).json({
                categories:JSON.parse(categories),
            })
        }
        await Categories.find({})
            .then(async (categories) => {
                await redis.set('categories', JSON.stringify(categories))
                res.status(200).json({
                    categories:mutipleMongooseToOject(categories),
                })
            })
            .catch(error => next(error))
    }
    
    async create(req, res){
        try{
            const {name} = req.body

            const category = await Categories.findOne({name: name})
            if(category){
                return res.status(401).json({msg: 'Category exsist!'})
            }
            const temp = new Categories(req.body)
            const categories = await redis.get('categories');

            if(categories){
                const parsed = JSON.parse(categories);
                await redis.set('categories', JSON.stringify([...parsed, temp]))
            }
            return temp.save()
                    .then(() => {
                       res.status(200).json({msg: 'Category add successfully!'})
                    })
                    .catch(error => {
                        res.send(error)
                    })
        }catch{
            return res.status(500)
        }
    }

    async edit(req, res, next) {
        const categoryId = req.params.id;
        const updateData = req.body;
        const categories = await redis.get('categories');
        const parsed = JSON.parse(categories);
        console.log(parsed);
        
        const edited = parsed.forEach(element => {
            if (element._id === categoryId) {
                element.name = updateData
                return
            }
        });
        console.log(edited);
        
        await redis.set('categories', JSON.stringify(edited))

        Categories.updateOne({ _id: categoryId }, updateData)
            .then(result => {
                if (result.nModified === 0) {
                    return res.status(404).json({ msg: 'Category not found or no changes made.' });
                }
                return res.status(200).json({ msg: 'Category edited successfully!' });
            })
            .catch(error => {
                console.error("Error updating category:", error);
                res.status(500).json({ msg: 'An error occurred while editing the category.' });
            });
    }
    

    async delete(req, res, next){
        const categories = await redis.get('categories');
        const parsed = JSON.parse(categories);
        console.log(parsed);
        
        const filtered = parsed.filter(element => element._id != req.params.id)
        console.log(filtered);
        
        await redis.set('categories', JSON.stringify(filtered))

        Categories.deleteOne({_id: req.params.id})
            .then(async () => {
                res.status(200).json({msg: 'Category deleted successfully!'})
            })
            .catch(next)
    }        
}

module.exports = new categoriesController;