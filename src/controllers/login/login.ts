import { NextFunction, Response } from "express"
import HttpStatus from "http-status-codes"
import { sign } from "jsonwebtoken"

import { ValidatedRequest } from "express-joi-validation"
import { IGetLoginSchema } from "../../schemas/LoginSchema"
import config from "../../config/config"

class LoginController {
    constructor(){}

    login = (req: ValidatedRequest<IGetLoginSchema>, res: Response, next: NextFunction) => {
        const { username, password } = req.body
        if(!username || !password) {
            res.status(HttpStatus.UNAUTHORIZED).send({
                success: false,
                error: "Invalid username or password"
            })
        }
        const generatedToken = sign(req.body, config.secret_key, {
            expiresIn: config.expriration_time,
        })
        res.status(HttpStatus.OK).send({
            success: true,
            token: generatedToken
        })
    }
}

export {
    LoginController
}