const mockCoworkings = require('../db/mock-coworkings')
const { CoworkingModel } = require('../db/sequelize')

exports.findAllCoworkings = (req, res) => {
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
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })

    if (indexInArray === -1) {
        return res.json({ message: `Le coworking ${req.params.id} n'existe pas.` })
    } else {
        let updatedCoworking = { ...mockCoworkings[indexInArray], ...req.body }
        mockCoworkings[indexInArray] = updatedCoworking;

        return res.json({ message: `Le coworking ${updatedCoworking.name} a été modifié`, data: updatedCoworking })
    }
}
exports.deleteCoworking = (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })

    if (indexInArray === - 1) {
        return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
    } else {
        const deletedeCoworkings = mockCoworkings.splice(indexInArray, 1)
        return res.json({ message: `L'élément id ${req.params.id} a bien été supprimé`, data: deletedeCoworkings[0] })
    }
}