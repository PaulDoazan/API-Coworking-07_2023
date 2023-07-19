const express = require('express')
const router = express.Router()
const generatedModelsController = require('../controllers/generatedModelsController')

router
    .route('/')
    .get(generatedModelsController.findAllGeneratedModels)

module.exports = router