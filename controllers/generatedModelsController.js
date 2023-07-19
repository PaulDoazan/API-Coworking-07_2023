const { GeneratedModels } = require('../db/sequelize')

exports.findAllGeneratedModels = (req, res) => {
    GeneratedModels.continents
        .findAll()
        .then(result => {
            console.log(result);
            res.json({ message: 'La liste des models générés a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.json({ message: error })
        })
}