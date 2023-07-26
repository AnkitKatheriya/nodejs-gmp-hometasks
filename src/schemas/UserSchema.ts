import * as Joi from '@hapi/joi'
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { UserModel } from '../models/user'

const userSchema = Joi.object<UserModel>({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string()
                    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
                    .required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
})

const queryParamSchema = Joi.object({
    query: Joi.string().required()
})

const userUpdateSchema = userSchema.fork(
    ["login", "password", "age", "isDeleted"],
	(schema) => schema.optional(),
)

interface IUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: UserModel
}


export {
    userSchema,
    queryParamSchema,
    userUpdateSchema,
    IUserRequestSchema
}