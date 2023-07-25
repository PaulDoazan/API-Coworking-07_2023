const express = require('express')
const morgan = require('morgan')
const sequelize = require('./db/sequelize')
const app = express()
const port = 3000

sequelize.initDb()

app.use(morgan('dev'))
app.use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})