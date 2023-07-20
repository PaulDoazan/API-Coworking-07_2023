const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingController')
const multer = require('../middleware/multer-config');

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(coworkingController.createCoworking)

router
    .route('/withImg')
    .post(multer, coworkingController.createCoworkingWithImage)

router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(coworkingController.updateCoworking)
    .delete(coworkingController.deleteCoworking)

module.exports = router