const express = require('express')
const router = express.Router()


const userControllers = require('../app/controllers/userController')
const auth = require('../middleware/handle_login')

router.use(auth)
router.get('/', userControllers.Show)
router.get('/:id', userControllers.showProfile)

module.exports = router