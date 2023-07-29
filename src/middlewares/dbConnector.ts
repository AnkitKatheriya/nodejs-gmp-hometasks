const Sequelize = require('sequelize')
import config from "../config/dbConfig"

const startConnection = () => {
    const connection = new Sequelize(config.database, config.userName, config.password, {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        protocol: config.protocol,
        dialectOptions: config.dialectOptions,
        logging: config.databaseLoging,
    })
    
    connection.authenticate().then(
        success => {
            console.log('success', success)
        },
        error => {
            console.log('error', error)
        }
    )
    return connection
}

export default startConnection