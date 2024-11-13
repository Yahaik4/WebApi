
class productsController{

    async Show(req, res, next){
        
        const category = req.query.category
        const url = category ? `http://backend:3000/product?category=${category}` : 'http://backend:3000/product';
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'userId': `${req.headers?.cookie}`
            },
            credentials: 'include',
        })

        const result = await response.json();
        // if (!result.ok) {
        //     console.log(result)
        // }
        const {products, categories, selectedCategory} = result;        
                
        res.render('Products/show', {products, categories, selectedCategory})
    }    

    // [GET] /create
    async createPage(req, res, next){
        try {
            const response = await fetch('http://backend:3000/category', {
                method: 'GET',
                headers: {
                    'userId': `${req.headers?.cookie}`
                },
                credentials: 'include'
            })
            const result = await response.json();
            const categories = result.categories
            
            res.render('Products/create', {categories})
        } catch (error) {
            console.log(error)
        }
    }

    // [POST] /create
    // create(req, res, next){
    //     const {size, colour} = req.body
    //     const fileImage = req.file.filename
    //     const sizeArray = size.split(',').map(s => s.trim())
    //     const colourArray = colour.split(',').map(s => s.trim())
    //     const product = new Product(req.body)

    //     product.size = sizeArray
    //     product.colour = colourArray
    //     product.image = fileImage

    //     product.save()
    //         .then(() => {
    //             res.status(200).json({message: 'Product created successfully!'})
    //         }).catch(error => {
    //             next(error)
    //         })
    // }

    // [GET] / product/:slug
    // showbySlug(req, res, next){
    //     Product.findOne({slug: req.params.slug})
    //         .then((product) => {
    //             res.status(200).json(product)
    //         })
    //         .catch(err => {
    //             res.status(400).json({Error: err})
    //         })
    // }

    // [GET] /edit/:id
    async editPage(req, res, next){
        const params = req.params

        const response = await fetch(`http://backend:3000/product/edit/${params.id}`, {
            method: 'GET',
            headers: {
                'userId': `${req.headers?.cookie}`
            },
            credentials: 'include'
        })
        const result = await response.json();
        const {product, categories} = result;        

        res.render('Products/edit', {product, categories})
    }

    // [PUT] /edit/:id
    // edit(req, res, next) {
    //     const updates = req.body;
        
    //     if (req.file) {
    //         const newImg = req.file.filename;
    
    //         Product.findById(req.params.id)
    //             .then(product => {
    //                 if (product.image) {
    //                     const oldImagePath = path.join(__dirname, '..', 'public', 'img', 'product', product.image);
    //                     fs.unlink(oldImagePath, err => {
    //                         if (err) console.error(err);
    //                     });
    //                 }
            
    //                 updates.image = newImg;
    
    //                 return Product.updateOne({ _id: req.params.id }, updates);
    //             })
    //             .then(() => {
    //                 return res.status(200).json({message: 'Product edited successfully!'})
    //             })
    //             .catch(next);
    //     } else {
    //         Product.updateOne({ _id: req.params.id }, updates)
    //             .then(() => {
    //                 return res.status(200).json({message: 'Product edited successfully!'})
    //             })
    //             .catch(next);
    //     }
    // }
    

    // [DELETE] /product/:id
    // delete(req, res, next){        
    //     Product.deleteOne({_id: req.params.id})
    //         .then(() => {
    //             res.status(200).json({message: 'Delete successfully'})
    //         })
    //         .catch(error => console.log(error))
    // }

    // deleteAll(req, res, next){    

    //     const listId = req.body.id.split(',')
    //     console.log(listId)
        
    //     for(let i = 0; i < listId.length; i++){
    //         Product.deleteOne({_id: listId[i]})
    //             .then(() => console.log('success'))
    //     }
    //     req.flash('success', 'Product deleted successfully!')
    //     return res.redirect('/product')
    // }

}

module.exports = new productsController