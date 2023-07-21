const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
    .route('/')
    .get(userController.findAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .delete(userController.deleteUser)
    .put(userController.updateUser)

module.exports = router