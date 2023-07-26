import { Op } from "sequelize"
import { UserModel, initUserModel } from "../models"
import { v4 as uuidv4 } from "uuid"
import startConnection from "../middlewares"

export class UserDataAccessor {
    private readonly userModel = UserModel;
    constructor() {
        initUserModel(startConnection());
    }

    create(user: UserModel): Promise<UserModel> {
        const { login, password, age, isDeleted } = user;
        return this.userModel.create({
            id: uuidv4(),
            login,
            password,
            age,
            isDeleted,
        })
    }

    findAll(login?: string, limit?: number): Promise<UserModel[]> {
        return this.userModel.findAll({
            where: {
                isDeleted: false,
                ...(login && {
                    login: {
                        [Op.like]: `%${login}%`
                    }
                })
            },
            limit,
        })
    }

    findById(id: string): Promise<UserModel> {
        return this.userModel.findOne({
            where: { id }
        })
    }

    update(id:string, user: UserModel) {
        const { login, password, age } = user
        return this.userModel.update({
			login,
			password,
			age,
		},
		{
			where: { id },
			returning: true,
		})
    }

    delete(id: string) {
        return this.userModel.update({
            isDeleted: true,
        }, {
            where: { id },
            returning: true,
        })
    }
}