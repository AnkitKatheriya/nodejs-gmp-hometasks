import * as Joi from '@hapi/joi'
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { User } from '../types/User';

const userSchema = Joi.object<User>({
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

const userAutoSearchSchema = userSchema.fork(
    ["loginSubstring", "limit"],
    (schema) => schema.optional() 
)

interface IUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: User
}


export {
    userSchema,
    queryParamSchema,
    userUpdateSchema,
    userAutoSearchSchema,
    IUserRequestSchema
}