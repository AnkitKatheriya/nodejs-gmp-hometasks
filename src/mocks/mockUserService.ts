import { User, Users } from '../types/User';
/* eslint-disable */
export class MockUserService {
  create(userModel: User): Promise<User> {
    return Promise.resolve(userModel);
  }
  findAll(login?: string, limit?: number): Promise<Users | null> {
    if (login === '1') {
      return Promise.resolve([{ login: '1' }] as Users);
    }
    if (login === '2') {
      return Promise.resolve([{ login: '2' }] as Users);
    }
    return Promise.resolve([{ login: '1' }, { login: '2' }] as Users);
  }
  findById(id: string): Promise<User | null> {
    return Promise.resolve({
      id,
      login: id,
    } as User);
  }
  update(
    id: string,
    user: User
  ): Promise<[affectedCount: number, affectedRows: Users]> {
    return Promise.resolve([1, [user]]);
  }
  delete(_: string): Promise<[number, Users]> {
    return Promise.resolve([
      1,
      [{ isDeleted: true, login: 'deleted' } as User],
    ]);
  }
}
