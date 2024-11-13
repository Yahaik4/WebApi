const express = require('express')
const router = express.Router()

const categoryRouter = require('../app/controllers/categoryController')
const auth = require('../middleware/handle_login')

router.use(auth)
router.delete('/:id', categoryRouter.delete)
router.put('/:id', categoryRouter.edit)
router.post('/', categoryRouter.create)
router.get('/', categoryRouter.Show)

module.exports = router