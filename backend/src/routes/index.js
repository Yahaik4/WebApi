const siteRouter = require ('./site')
const userRouter = require('./user')
const productRouter = require('./product')
const categoryRouter = require('./category')


function route(app){
    app.use('/category', categoryRouter)
    app.use('/product', productRouter)
    app.use('/account', userRouter)
    app.use('/', siteRouter)
}


module.exports = route;