import { DataTypes, Sequelize } from 'sequelize';

export const initUserModel = (connectionDb: Sequelize) =>
  connectionDb.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.SMALLINT,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
