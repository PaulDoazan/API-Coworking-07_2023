const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock-coworkings')
const bcrypt = require('bcrypt')
const roles = ['user', 'editor', 'admin']

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
const defineRoleModel = require('../models/rolesModelDefinition')

const CoworkingModel = defineCoworkingModel(sequelize, DataTypes)
const UserModel = defineUserModel(sequelize, DataTypes)
const RoleModel = defineRoleModel(sequelize, DataTypes)

RoleModel.hasMany(UserModel, {
    foreignKey: {
        allowNull: false,
        defaultValue: 1
    }
});

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

            Promise.all(roles.map(role => {
                return RoleModel.create({
                    label: role
                })
            })).then(() => {
                bcrypt.hash('mdp', 10)
                    .then(hash => {
                        RoleModel.findOne({ where: { label: 'user' } }).then(result => {
                            UserModel.create({
                                username: 'Jean',
                                password: hash,
                                RoleId: result.id
                            })
                        })
                    })
                bcrypt.hash('mdp', 10)
                    .then(hash => {
                        RoleModel.findOne({ where: { label: 'editor' } }).then(result => {
                            UserModel.create({
                                username: 'Paul',
                                password: hash,
                                RoleId: result.id
                            })
                        })
                    })
                bcrypt.hash('mdp', 10)
                    .then(hash => {
                        RoleModel.findOne({ where: { label: 'admin' } }).then(result => {
                            UserModel.create({
                                username: 'Pierre',
                                password: hash,
                                RoleId: result.id
                            })
                        })
                    })
            })

            // roles.forEach(role => {
            //     RoleModel.create({
            //         label: role
            //     })
            // })

            // RoleModel.findAll()
            //     .then(result => {
            //         console.log(result)
            //     })
        })
}

module.exports = {
    initDb, CoworkingModel, UserModel, RoleModel
}