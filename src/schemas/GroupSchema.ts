import * as Joi from '@hapi/joi'
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { Group, Permission } from '../types/Group';

const groupSchema = Joi.object<Group>({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
})

const groupCreateSchema = groupSchema.fork(
    ["name", "permissions"],
	(schema) => schema.required(),
)

const groupUpdatedSchema = groupSchema.fork(
    ["name", "permissions"],
	(schema) => schema.required(),
)

const groupDeleteSchema = groupSchema.fork(
    ["id"],
    (schema) => schema.required(),
)

interface ICreateGroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string,
        permissions: Array<Permission>,
    }
}

interface IUpdateGroupRequestSchema extends ICreateGroupRequestSchema {}

interface IDeleteGroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string
    }
}

export {
    groupSchema,
    groupCreateSchema,
    groupUpdatedSchema,
    groupDeleteSchema,
    ICreateGroupRequestSchema,
    IUpdateGroupRequestSchema,
    IDeleteGroupRequestSchema,
}