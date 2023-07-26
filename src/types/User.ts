type User = {
    id?: string;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
}

type Users = Array<User>

export {
    User,
    Users
}