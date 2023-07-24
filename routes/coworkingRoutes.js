const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(authController.protect, authController.restrictTo("editor"), coworkingController.createCoworking)

router
    .route('/withReview')
    .get(coworkingController.findAllCoworkingsByReview)

router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(coworkingController.updateCoworking)
    .delete(authController.protect, authController.restrictTo("admin"), coworkingController.deleteCoworking)

module.exports = router