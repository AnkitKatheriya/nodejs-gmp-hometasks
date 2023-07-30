import { initGroupModel } from './group';
import { initUserModel } from './user';
import { Sequelize } from 'sequelize';
import { initUserGroupModel } from './user-group';

export const initModels = (connectionDb: Sequelize) => {
  const UserModel = initUserModel(connectionDb);
  const GroupModel = initGroupModel(connectionDb);
  const UserGroupModel = initUserGroupModel(connectionDb);
  UserModel.belongsToMany(GroupModel, {
    through: UserGroupModel,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

  GroupModel.belongsToMany(UserModel, {
    through: UserGroupModel,
    foreignKey: 'group_id',
    onDelete: 'CASCADE',
  });
  UserModel.sync();
  GroupModel.sync();
  UserGroupModel.sync();

  return {
    UserModel,
    GroupModel,
    UserGroupModel,
  };
};
