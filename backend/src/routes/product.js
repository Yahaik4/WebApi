const express = require('express')
const router = express.Router()

const productsController = require('../app/controllers/productController')
const auth = require('../middleware/handle_login')
const upload = require('../middleware/multerConfig')

router.use(auth)
router.post('/deleteAllSelected', productsController.deleteAll)
// router.get('/create', productsController.createPage);
router.post('/create', upload.single('image'), productsController.create);
router.get('/edit/:id', productsController.editPage);
router.put('/edit/:id', upload.single('image'), productsController.edit);
router.delete('/:id', productsController.delete);
// router.get('/:slug', productsController.showbySlug);
router.get('/', productsController.Show);


module.exports = router
