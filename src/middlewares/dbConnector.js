const Sequelize = require('sequelize')
const config = require('../config/dbConfig')

const sequelize = new Sequelize(config.database, config.userName, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    protocol: config.protocol,
    dialectOptions: config.dialectOptions
})

sequelize.authenticate().then(
    success => {
        console.log('success', success)
    },
    error => {
        console.log('error', error)
    }
)

module.exports = sequelize