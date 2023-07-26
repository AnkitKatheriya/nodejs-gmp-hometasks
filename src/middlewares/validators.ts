import * as Joi from '@hapi/joi'

const userSchema = Joi.object().keys({
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

export {
    userSchema,
    queryParamSchema
}