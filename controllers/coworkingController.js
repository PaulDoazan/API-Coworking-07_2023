const mockCoworkings = require('../db/mock-coworkings')
const { CoworkingModel } = require('../db/sequelize')

const findAllCoworkings = (req, res) => {
    // const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    // const orderBy = req.query.orderBy || 'ASC'
    // const arrToSort = [...mockCoworkings];
    // const nosort = req.query.nosort

    // if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

    //     arrToSort.sort((a, b) => {
    //         return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
    //     })
    // }

    // res.json({ message: 'La liste des coworkings a bien été récupérée.', data: arrToSort })
    CoworkingModel.findAll()
        .then((elements) => {
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({ message: msg, data: elements })
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({ message: msg })
        })
}

const findCoworkingByPk = (req, res) => {
    // let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))

    // if (targetCoworking) {
    //     return res.json({ message: `L'élément ayant pour id ${targetCoworking.id} a bien été récupéré.`, data: targetCoworking })
    // } else {
    //     return res.json({ message: `L'élément ayant pour id ${req.params.id} n'a pas pu être récupéré.` })
    // }
    CoworkingModel.findByPk(req.params.id)
        .then(coworking => {
            if (coworking === null) {
                const message = `Le coworking demandé n'existe pas.`
                res.status(404).json({ message })
            } else {
                const message = "Un coworking a bien été trouvé."
                res.json({ message, data: coworking });
            }
        })
        .catch(error => {
            const message = `La liste des coworkings n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}
const createCoworking = (req, res) => {
    // on ajoute à un nouvel objet {} un id unique, en l'occurrence égal au dernier id du mock-coworkings auquel on ajoute 1
    // const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    // const newCoworking = { id: newId, ...req.body }
    // mockCoworkings.push(newCoworking)
    // return res.json({ message: `Un nouveau coworking n°${newCoworking.id} a été créé.`, data: newCoworking })
    let newCoworking = req.body;

    CoworkingModel.create({
        name: newCoworking.name,
        price: newCoworking.price,
        address: newCoworking.address,
        picture: newCoworking.picture,
        superficy: newCoworking.superficy,
        capacity: newCoworking.capacity
    }).then((el) => {
        const msg = 'Un coworking a bien été ajouté.'
        res.json({ message: msg, data: el })
    }).catch(error => {
        res.status(500).json(error)
    })
}

const updateCoworking = (req, res) => {
    // const indexInArray = mockCoworkings.findIndex((element) => {
    //     return element.id === parseInt(req.params.id)
    // })

    // if (indexInArray === -1) {
    //     return res.json({ message: `Le coworking ${req.params.id} n'existe pas.` })
    // } else {
    //     let updatedCoworking = { ...mockCoworkings[indexInArray], ...req.body }
    //     mockCoworkings[indexInArray] = updatedCoworking;

    //     return res.json({ message: `Le coworking ${updatedCoworking.name} a été modifié`, data: updatedCoworking })
    // }
    CoworkingModel.findByPk(req.params.id)
        .then(coworking => {
            coworking.dataValues = { ...coworking.dataValues, ...req.body }
            coworking.save()
            return res.json({ message: `Le coworking ${coworking.name} a été modifié`, data: coworking })
        })
}

const deleteCoworking = (req, res) => {
    // const indexInArray = mockCoworkings.findIndex((element) => {
    //     return element.id === parseInt(req.params.id)
    // })

    // if (indexInArray === - 1) {
    //     return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
    // } else {
    //     const deletedeCoworkings = mockCoworkings.splice(indexInArray, 1)
    //     return res.json({ message: `L'élément id ${req.params.id} a bien été supprimé`, data: deletedeCoworkings[0] })
    // }
    CoworkingModel.findByPk(req.params.id)
        .then(coworking => {
            if (coworking === null) {
                const message = `Le coworking demandé n'existe pas.`
                return res.status(404).json({ message })
            }
            return CoworkingModel.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    const message = `Le coworking ${coworking.name} a bien été supprimé.`
                    res.json({ message, data: coworking });
                })
        })
        .catch(error => {
            const message = `Impossible de supprimer le coworking.`
            res.status(500).json({ message, data: error })
        })
}

module.exports = {
    findAllCoworkings, findCoworkingByPk, createCoworking, updateCoworking, deleteCoworking
}