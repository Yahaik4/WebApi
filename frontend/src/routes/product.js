const express = require('express')
const router = express.Router()
const handle_auth = require('../util/index')

const productsController = require('../controllers/productController')

router.use(handle_auth)
// router.post('/deleteAllSelected', productsController.deleteAll)
router.get('/create', productsController.createPage);
// router.post('/create', upload.single('image'), productsController.create);
router.get('/edit/:id', productsController.editPage);
// router.put('/edit/:id', upload.single('image'), productsController.edit);
// router.delete('/:id', productsController.delete);
// router.get('/:slug', productsController.showbySlug);
router.get('/', productsController.Show);


module.exports = router
