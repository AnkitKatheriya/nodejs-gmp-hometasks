import express from "express"
import bodyParser from 'body-parser'
// const validator = require('express-joi-validation').createValidator({})
import { userRouter } from "./routers";
import { notFound, errorHandler } from "./middlewares";
require('dotenv').config()

const app = express()

// App configuration
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
