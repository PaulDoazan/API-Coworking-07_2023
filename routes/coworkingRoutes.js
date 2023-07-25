const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingController')
const authController = require('../controllers/authController')
const { CoworkingModel } = require('../db/sequelize')

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(authController.protect, authController.restrictTo("editor"), coworkingController.createCoworking)

router
    .route('/withReview')
    .get(coworkingController.findAllCoworkingsByReview)

router
    .route('/rawSql')
    .get(coworkingController.findAllCoworkingsWithRawSql)


router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(authController.protect, authController.restrictToOwnUser(CoworkingModel), coworkingController.updateCoworking)
    .delete(authController.protect, authController.restrictTo("admin"), coworkingController.deleteCoworking)

module.exports = router