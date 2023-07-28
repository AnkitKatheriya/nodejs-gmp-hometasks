import * as Joi from '@hapi/joi'
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { Group } from '../types/Group';

const groupSchema = Joi.object<Group>({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.Array()
})

interface IGroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Group
}

export {
    groupSchema,
    IGroupRequestSchema,
}