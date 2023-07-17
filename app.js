const mockCoworkings = require('./mock-coworkings')
const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const app = express()
const port = 3000


const sequelize = new Sequelize(
    'coworking_07_2023',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        logging: false
    }
)

// const CoworkingModel = require('./models/coworkingModel')
// const Coworking = CoworkingModel(sequelize, DataTypes)

// const User = sequelize.define('User', {
//     username: DataTypes.STRING,
//     birthday: DataTypes.DATE,
// });

// User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20),
// });

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

app.use(express.json())
app.use('/api/coworkings', require('./routes/coworkingRoutes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})