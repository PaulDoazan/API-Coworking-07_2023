const { UniqueConstraintError, ValidationError, Op } = require('sequelize')
const { ReviewModel } = require('../db/sequelize')

exports.findAllReviews = (req, res) => {
    ReviewModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des avis a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}