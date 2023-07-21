const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock-coworkings')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('coworking_07_2023', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(`Ìmpossible de se connecter à la base de données ${error}`))

const defineCoworkingModel = require('../models/coworkingModelDefinition')
const defineUserModel = require('../models/userModelDefinition')
const CoworkingModel = defineCoworkingModel(sequelize, DataTypes)
const UserModel = defineUserModel(sequelize, DataTypes)

const initDb = () => {
    sequelize
        .sync({ force: true })
        .then(() => {
            mockCoworkings.forEach(mock => {
                CoworkingModel.create({
                    name: mock.name,
                    price: mock.price,
                    superficy: mock.superficy,
                    capacity: mock.capacity,
                    address: mock.address
                });
            })
            bcrypt.hash('mdp', 10)
                .then(hash => {
                    UserModel.create({
                        username: 'Jean',
                        password: hash
                    })
                })

        })
}

module.exports = {
    initDb, CoworkingModel, UserModel
}