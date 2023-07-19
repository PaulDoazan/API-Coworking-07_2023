const { CoworkingModel } = require('../db/sequelize')

exports.findAllCoworkings = (req, res) => {
    CoworkingModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des coworkings a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.json({ message: error })
        })
}

exports.findCoworkingByPk = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.json({ message: `L'élément ayant pour id ${req.params.id} n'existe pas.` })
            } else {
                res.json({ message: `L'élément a bien été récupéré.`, data: result })
            }
        })
        .catch(error => {
            res.json({ message: `Une erreur est survenue : ${error}` })
        })
}

exports.createCoworking = (req, res) => {
    const newCoworking = req.body
    CoworkingModel
        .create({
            name: newCoworking.name,
            price: newCoworking.price,
            superficy: newCoworking.superficy,
            capacity: newCoworking.capacity,
            address: newCoworking.address
        })
        .then((result) => {
            res.json({ message: 'Un coworking a bien été ajouté.', data: result })
        })
        .catch((error) => {
            res.json({ message: `Une erreur est survenue :  ${error}` })
        })
}

exports.updateCoworking = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                throw new Error('Aucun coworking trouvé')
                // res.json({ message: 'Aucun coworking trouvé' })
            } else {
                result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Coworking modifié : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            res.json({ message: error.message })
        })
}
exports.deleteCoworking = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                throw new Error('Aucun coworking trouvé')
                // res.json({ message: 'Aucun coworking trouvé' })
            } else {
                result
                    .destroy()
                    .then(() => {
                        res.json({ message: `Coworking supprimé : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            res.json({ message: `${error}` })
        })
}