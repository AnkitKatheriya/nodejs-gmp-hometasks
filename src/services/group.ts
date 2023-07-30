import { GroupDataAccessor } from '../data-access';
import { Group, Groups } from '../types/Group';

class GroupService {
  private groupDataAccess: GroupDataAccessor;
  constructor(groupDataAccess = new GroupDataAccessor()) {
    this.groupDataAccess = groupDataAccess;
  }

  create(group: Group): Promise<Group> {
    return this.groupDataAccess.create(group);
  }

  findAll(): Promise<Groups> {
    return this.groupDataAccess.findAll();
  }

  findByid(id: string): Promise<Group> {
    return this.groupDataAccess.findById(id);
  }

  update(id: string, group: Group) {
    return this.groupDataAccess.update(id, group);
  }

  delete(id: string) {
    return this.groupDataAccess.delete(id);
  }

  addUsersToGroup(grouId: string, userIds: Array<string>) {
    return this.groupDataAccess.addUsersToGroup(grouId, userIds);
  }
}

export { GroupService };
