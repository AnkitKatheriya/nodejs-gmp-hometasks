const Sequelize = require('sequelize')
import config from "../config/dbConfig"

const sequelize = new Sequelize(config.database, config.userName, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    protocol: config.protocol,
    dialectOptions: config.dialectOptions
})

const startConnection = sequelize.authenticate().then(
    success => {
        console.log('success', success)
    },
    error => {
        console.log('error', error)
    }
)

export default startConnection