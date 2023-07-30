import * as Joi from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

import { Login } from '../types/Login';

const loginSchema = Joi.object<Login>().options({ abortEarly: false }).keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const getLoginSchema = loginSchema.fork(['username', 'password'], schema =>
  schema.required()
);

/* eslint-disable */
interface IGetLoginSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    username: string;
    password: string;
  };
}

export { loginSchema, getLoginSchema, IGetLoginSchema };
