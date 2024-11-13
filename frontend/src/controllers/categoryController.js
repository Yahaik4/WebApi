class categoriesController{
    async Show(req, res, next){

        const response = await fetch('http://backend:3000/category', {
            method: 'GET',
            headers: {
                'userId': `${req.headers?.cookie}`
            },
        })
        const result = await response.json();
        const {categories} = result;        
                
        res.render('Categories/show', {categories})
    }
    
    // async create(req, res){
    //     try{
    //         const {name} = req.body

    //         const category = await Categories.findOne({name: name})
    //         if(category){
    //             return res.status(401).json({message: 'Category existed'})
    //         }
    //         const temp = new Categories(req.body)
    //         return temp.save()
    //                 .then(() => {
    //                     return res.status(200).json({message: 'Add successfully'})
    //                 })
    //                 .catch(error => {
    //                     res.send(error)
    //                 })
    //     }catch{
    //         return res.status(500)
    //     }
    // }

    // edit(req, res, next){
    //     Categories.updateOne({_id: req.params.id}, req.body)
    //         .then(() => {
    //             return res.status(200).json({success: 'Category edit successfully!'})
    //         })
    //         .catch(next)
    // }

    // delete(req, res, next){
    //     Categories.deleteOne({_id: req.params.id})
    //         .then(() => {
    //             return res.status(200).json({success: 'Category deleted successfully!'})
                
    //         })
    //         .catch(next)
    // }        
}

module.exports = new categoriesController;