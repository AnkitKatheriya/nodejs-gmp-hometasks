import { Sequelize, DataTypes } from 'sequelize';

export const initGroupModel = (connectionDb: Sequelize) =>
  connectionDb.define('groups', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    permissions: DataTypes.ARRAY(DataTypes.STRING),
  });
