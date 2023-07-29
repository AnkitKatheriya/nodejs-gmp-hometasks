import HttpStatus from "http-status-codes"

import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import config from "../config/config";

const authentication = (req:Request , res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"] as string;
    if(!token){
        res.status(HttpStatus.UNAUTHORIZED).send({
            isAuthenticated: false,
            error: "Unauthorized Error"
        })
    } else {
        verify(token, config.secret_key, (error: Error) => {
            if(error) {
                res.status(HttpStatus.FORBIDDEN).json({
                    isAuthenticated: false,
                    error:  error.message,
                });
            } else {
                next()
            }
        })
    }
}

export {
    authentication
}