const mockCoworkings = require('./mock-coworkings')
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(express.json())

app.get('/api/coworkings/:id', (req, res) => {
    let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))

    if (targetCoworking) {
        return res.json({ message: `L'élément ayant pour id ${targetCoworking.id} a bien été récupéré.`, data: targetCoworking })
    } else {
        return res.json({ message: `L'élément ayant pour id ${req.params.id} n'a pas pu être récupéré.` })
    }
})

app.get('/api/coworkings', (req, res) => {
    const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    const orderBy = req.query.orderBy || 'ASC'
    const arrToSort = [...mockCoworkings];
    const nosort = req.query.nosort

    if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

        arrToSort.sort((a, b) => {
            return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
        })
    }

    res.json({ message: 'La liste des coworkings a bien été récupérée.', data: arrToSort })
})

app.post('/api/coworkings', (req, res) => {
    // on ajoute à un nouvel objet {} un id unique, en l'occurrence égal au dernier id du mock-coworkings auquel on ajoute 1
    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    const newCoworking = { id: newId, ...req.body }
    mockCoworkings.push(newCoworking)
    return res.json({ message: `Un nouveau coworking n°${newCoworking.name} a été créé.`, data: newCoworking })
})

app.put('/api/coworkings/:id', (req, res) => {
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
})

app.delete('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })

    if (indexInArray === - 1) {
        return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
    } else {
        const deletedeCoworkings = mockCoworkings.splice(indexInArray, 1)
        return res.json({ message: `L'élément id ${req.params.id} a bien été supprimé`, data: deletedeCoworkings[0] })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})