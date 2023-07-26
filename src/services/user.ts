import { UserModel } from "../models";
import { UserDataAccessor } from "../data-access";

class UserService {
    private dataAccessor: UserDataAccessor;
    constructor(dataAccerror: UserDataAccessor = new UserDataAccessor()){
        this.dataAccessor = dataAccerror
    }

    create(user: UserModel): Promise<UserModel> {
        return this.dataAccessor.create(user)
    }

    findAll(login?: string, limit?: number) : Promise<UserModel[]> {
        return this.dataAccessor.findAll(login, limit)
    }

    findByid(id: string) : Promise<UserModel> {
        return this.dataAccessor.findById(id)
    }

    update(id: string, user: UserModel) {
        const { login, password, age } = user
        return this.dataAccessor.update(id, {
            login,
            password,
            age,
        } as UserModel)
    }

    delete(id: string) {
        return this.dataAccessor.delete(id)
    }
}

export {
    UserService
}