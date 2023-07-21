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

exports.createUser = (req, res) => {
    UserModel
        .create(req.body)
        .then(result => {
            res.status(201).json({ message: 'Un utilisateur a bien été créé.', data: result })
        })
        .catch(error => {
            if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                const cleanMessage = error.message.split(': ')[1]
                return res.status(400).json({ message: cleanMessage })
            }

            res.status(500).json({ message: error })
        })
}