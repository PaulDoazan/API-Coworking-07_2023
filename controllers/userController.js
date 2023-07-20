const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel } = require('../db/sequelize')

exports.findAllUsers = (req, res) => {
    UserModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des utilisateurs a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}