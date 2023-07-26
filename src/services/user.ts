import { User, Users } from "../types/User";
import { UserDataAccessor } from "../data-access";

class UserService {
    private dataAccessor: UserDataAccessor;
    constructor(dataAccerror: UserDataAccessor = new UserDataAccessor()){
        this.dataAccessor = dataAccerror
    }

    create(user: User): Promise<User> {
        return this.dataAccessor.create(user)
    }

    findAll(login?: string, limit?: number) : Promise<Users> {
        return this.dataAccessor.findAll(login, limit)
    }

    findByid(id: string) : Promise<User> {
        return this.dataAccessor.findById(id)
    }

    update(id: string, user: User) {
        const { login, password, age } = user
        return this.dataAccessor.update(id, {
            login,
            password,
            age,
        } as User)
    }

    delete(id: string) {
        return this.dataAccessor.delete(id)
    }

    createBulkUsers() {
        return this.dataAccessor.bulkUserCreate()
    }
}

export {
    UserService
}