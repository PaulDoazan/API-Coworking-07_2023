const mockCoworkings = require('./mock-coworkings')
const express = require('express')
const app = express()
const port = 3000

app.get('/api/coworkings/:id', (req, res) => {
    // Afficher le nom du coworking qui correspond a l'id en parametre 
    // let targetCoworking;
    // for (let i = 0; i < mockCoworkings.length; i++) {
    //     const element = mockCoworkings[i];
    //     if (element.id === parseInt(req.params.id)) {
    //         targetCoworking = element
    //         break;
    //     }
    // }
    let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
    res.json({ result: `Nom du coworking : ${targetCoworking ? targetCoworking.name : 'inconnu'}` })
})

// let myIdentity = [2, 3]

// let nb1 = 3
// let nb2 = nb1
// nb2 += 4

// let myIdentity2 = [...myIdentity];
// myIdentity2.push(4)

// console.log(myIdentity2, myIdentity)

app.get('/api/coworkings', (req, res) => {
    const criterium = req.query.criterium ? req.query.criterium : 'superficy'
    const orderBy = req.query.orderBy || 'ASC'

    console.log('exemple : ', criterium, orderBy)

    const arrToSort = [...mockCoworkings];
    if ((orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

        arrToSort.sort((a, b) => {
            return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
        })
    }

    res.json(arrToSort)
})

// creer un nouveau endpoint pour afficher le tableau entier en json

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})