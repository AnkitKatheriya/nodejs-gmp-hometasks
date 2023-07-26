import * as Joi from '@hapi/joi'
// import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { DataTypes, Model, Sequelize  } from "sequelize"

export class UserModel extends Model {
    id?: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted?: boolean; 
}

export const initUserModel = (connectionDb: Sequelize ) => UserModel.init({
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
	},
	login: DataTypes.STRING,
	password: DataTypes.STRING,
	age: DataTypes.SMALLINT,
	isDeleted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
}, {
	sequelize: connectionDb,
	tableName: "users",
}).sync();