const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock-coworkings')
const bcrypt = require('bcrypt')
const roles = require('./roles.json')

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
const defineRoleModel = require('../models/roleModelDefinition')

const CoworkingModel = defineCoworkingModel(sequelize, DataTypes)
const UserModel = defineUserModel(sequelize, DataTypes)
const RoleModel = defineRoleModel(sequelize, DataTypes)

RoleModel.hasMany(UserModel)
UserModel.belongsTo(RoleModel)

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


            const rolePromises = roles.map(role => {
                return RoleModel.create({
                    label: role
                })
            })
            Promise.all(rolePromises).then(() => {
                RoleModel.findOne({ where: { label: 'editor' } })
                    .then(role => {
                        bcrypt.hash('mdp', 10)
                            .then(hash => {
                                UserModel.create({
                                    username: 'Simon',
                                    password: hash,
                                    RoleId: role.id
                                })
                            })
                    })
                RoleModel.findOne({ where: { label: 'admin' } })
                    .then(role => {
                        bcrypt.hash('mdp', 10)
                            .then(hash => {
                                UserModel.create({
                                    username: 'Pierre',
                                    password: hash,
                                    RoleId: role.id
                                })
                            })
                    })
            })
        })
}

module.exports = {
    initDb, CoworkingModel, UserModel, RoleModel
}