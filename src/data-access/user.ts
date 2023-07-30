import { Op } from 'sequelize';
import { initModels } from '../models';
import { User, Users } from '../types/User';
import { v4 as uuidv4 } from 'uuid';
import startConnection from '../middlewares';
import { mockUsers } from '../mocks/Users';

export class UserDataAccessor {
  private readonly userModel;
  constructor() {
    this.userModel = initModels(startConnection()).UserModel;
  }

  create(user: User): Promise<User> {
    const { login, password, age, isDeleted } = user;
    return this.userModel.create({
      id: uuidv4(),
      login,
      password,
      age,
      isDeleted,
    });
  }

  findAll(login?: string, limit?: number): Promise<Users> {
    return this.userModel.findAll({
      where: {
        isDeleted: false,
        ...(login && {
          login: {
            [Op.iLike]: `%${login}%`,
          },
        }),
      },
      order: ['login'],
      limit,
    });
  }

  findById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: { id },
    });
  }

  update(id: string, user: User) {
    const { login, password, age } = user;
    return this.userModel.update(
      {
        login,
        password,
        age,
      },
      {
        where: { id },
        returning: true,
      }
    );
  }

  delete(id: string) {
    return this.userModel.update(
      {
        isDeleted: true,
      },
      {
        where: { id },
        returning: true,
      }
    );
  }

  bulkUserCreate() {
    return this.userModel.bulkCreate(mockUsers, { returning: true });
  }
}
