const express = require('express')
const router = express.Router()

const categoryRouter = require('../controllers/categoryController')

// router.use(auth)
// router.delete('/:id', categoryRouter.delete)
// router.put('/:id', categoryRouter.edit)
// router.post('/', categoryRouter.create)
router.get('/', categoryRouter.Show)

module.exports = router