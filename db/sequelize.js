const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock-coworkings')

const sequelize = new Sequelize('nation', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(`Ìmpossible de se connecter à la base de données ${error}`))

// const defineCoworkingModel = require('../models/coworkingModelDefinition')
// const CoworkingModel = defineCoworkingModel(sequelize, DataTypes)

const initModels = require("../generated_models/init-models");
const GeneratedModels = initModels(sequelize);

const initDb = () => {
    // sequelize
    //     .sync({ force: true })
    //     .then(() => {
    //         mockCoworkings.forEach(mock => {
    //             CoworkingModel.create({
    //                 name: mock.name,
    //                 price: mock.price,
    //                 superficy: mock.superficy,
    //                 capacity: mock.capacity,
    //                 address: mock.address
    //             });
    //         })
    //     })
}

module.exports = {
    initDb, GeneratedModels
}