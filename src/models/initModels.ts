import { initUserModel } from './user';
import { Sequelize } from 'sequelize';

export const initModels = (connectionDb: Sequelize) => {
  initUserModel(connectionDb);
};
