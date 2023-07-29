import * as Joi from '@hapi/joi'
import HttpStatus from "http-status-codes";
import { Response, Request, NextFunction } from "express"
import { logger } from './logger';

const validator = (schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req.body, schema); 
    const valid = error == null; 
    if(valid){
        next(); 
    } else {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        logger.error(message)
        res.status(HttpStatus.BAD_REQUEST).json({ error: message})
    }
}

export {
    validator
}