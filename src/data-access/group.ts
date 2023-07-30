import { v4 as uuidv4 } from 'uuid';

import startConnection from '../middlewares/dbConnector';
import { initModels } from '../models';
import { Group, Groups } from '../types/Group';

class GroupDataAccessor {
  private readonly groupModel;
  private readonly userGroupModel;
  constructor() {
    const { GroupModel, UserGroupModel } = initModels(startConnection());
    this.groupModel = GroupModel;
    this.userGroupModel = UserGroupModel;
  }

  create(group: Group): Promise<Group> {
    const { name, permissions } = group;

    return this.groupModel.create({
      id: uuidv4(),
      name,
      permissions,
    });
  }

  findAll(): Promise<Groups> {
    return this.groupModel.findAll();
  }

  findById(id: string): Promise<Group> {
    return this.groupModel.findOne({ where: { id } });
  }

  update(id: string, group: Group): Promise<Group> {
    const { name } = group;

    return this.groupModel.update(
      {
        name,
      },
      {
        where: { id },
        returning: true,
      }
    );
  }

  delete(id: string) {
    return this.groupModel.destroy({ where: { id } });
  }

  addUsersToGroup(groupId: string, userIds: Array<string>): Promise<number> {
    return this.groupModel.sequelize.transaction(transaction => {
      return Promise.all(
        userIds.map(userId =>
          this.userGroupModel.create(
            {
              user_id: userId,
              group_id: groupId,
            },
            { transaction }
          )
        )
      ).then(res => res.length);
    });
  }
}

export { GroupDataAccessor };
