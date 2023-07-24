const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel, RoleModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ma_clé_secrète'
const rolesHierarchy = {
    admin: ["admin", "editor", "user"],
    editor: ["editor", "user"],
    user: ["user"]
}

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
    UserModel.findOne({ where: { username: req.body.username } })
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if (isValid) {
                        const token = jwt.sign({
                            data: user.username
                        }, SECRET_KEY, { expiresIn: 60 * 60 });

                        res.json({ message: 'login réussi', data: token })
                    } else {
                        return res.json({ message: `Le mot de passe n'est pas correct` })
                    }
                })
        })
        .catch(error => {
            // A CORRIGER
            console.log(error)
        })
}

exports.protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié` })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY)
            req.username = decoded.data
            next()
        } catch (error) {
            res.status(403).json({ message: `Le jeton n'est pas valide` })
        }
    } else {
        res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }
}

exports.restrictTo = (roleParam) => {
    return (req, res, next) => {
        if (!req.username) {
            return res.status(401).json({ message: "Vous n'etes pas authentifie" })
        }

        UserModel.findOne({ where: { username: req.username } })
            .then(user => {
                RoleModel.findOne({ where: { id: user.RoleId } })
                    .then(role => {
                        if (rolesHierarchy[role.label].includes(roleParam)) {
                            return next();
                        } else {
                            return res.status(403).json({ message: "Droits insuffisants" })
                        }
                    })
            })
            .catch(err => {
                const message = "Erreur lors de l'autorisation"
                res.status(500).json({ message, data: err })
            })
    }
}