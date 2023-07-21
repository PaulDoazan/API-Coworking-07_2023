const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')

exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const dataUser = { ...req.body, password: hash }
            return UserModel
                .create(dataUser)
                .then(result => {
                    res.status(201).json({ message: 'Un utilisateur a bien été créé.', data: { ...result, password: 'hidden' } })
                })
        })
        .catch(error => {
            if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message })
            }

            res.status(500).json({ message: error })
        })
}

exports.login = (req, res) => {
    res.json({ message: 'route du login' })
}