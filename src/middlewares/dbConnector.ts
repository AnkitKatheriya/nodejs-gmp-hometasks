import { Sequelize, Dialect } from 'sequelize';
import config from '../config/dbConfig';

const startConnection = () => {
  const connection = new Sequelize(
    config.database,
    config.userName,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect as Dialect,
      protocol: config.protocol,
      dialectOptions: config.dialectOptions,
    }
  );

  connection.authenticate().then(
    success => {
      console.log('success', success);
    },
    error => {
      console.log('error', error);
    }
  );
  return connection;
};

export default startConnection;
