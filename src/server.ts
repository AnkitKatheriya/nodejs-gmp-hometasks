const express = require('express')
const bodyParser = require('body-parser')
const validator = require('express-joi-validation').createValidator({})

const middleware = require('./middlewares');
const allRouter = require('./task2.1/routes/index')
require('dotenv').config()

const app = express()

// App configuration
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', allRouter.router)
app.use(middleware.notFound)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
