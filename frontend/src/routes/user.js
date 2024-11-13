const express = require('express')
const router = express.Router()


const userControllers = require('../controllers/userController')


// router.use(auth)
router.get('/', userControllers.Show)
router.get('/:id', userControllers.showProfile)

module.exports = router