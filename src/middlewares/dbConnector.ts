import { Sequelize, Dialect } from 'sequelize';

import config from "../config/config"
import { logger } from "./logger"

const startConnection = () => {
    logger.info(JSON.stringify(config))
    const connection = new Sequelize(config.database, config.userName, config.password, {
        host: config.host,
        port: config.port as number,
        dialect: config.dialect as Dialect,
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