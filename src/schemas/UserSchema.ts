import * as Joi from '@hapi/joi'
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { User } from '../types/User';

const userSchema = Joi.object<User>().options({ abortEarly: false }).keys({
    id: Joi.string().optional(),
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

const userCreateSchema = userSchema.fork(
    ["login", "password", "age", "isDeleted"],
	(schema) => schema.required(),
)

const userUpdateSchema = userSchema.fork(
    ["login", "password", "age", "isDeleted"],
	(schema) => schema.required(),
)

const userAutoSearchSchema = Joi.object().keys({
    loginSubstring: Joi.string(),
    limit: Joi.number().integer().min(0).optional()
})

/* eslint-disable */
interface ICreateUserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string,
        password: string,
        age: number,
        isDeleted: boolean,
    }
}

/* eslint-disable */
interface IUpdateUserRequestSchema extends ICreateUserRequestSchema {}

/* eslint-disable */
interface IAutoSearchUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        loginSubstring: string,
        limit: number,
    }
}


export {
    userSchema,
    queryParamSchema,
    userUpdateSchema,
    userCreateSchema,
    userAutoSearchSchema,
    ICreateUserRequestSchema,
    IUpdateUserRequestSchema,
    IAutoSearchUserSchema
}