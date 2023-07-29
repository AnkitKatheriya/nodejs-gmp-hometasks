import { Request, Response, NextFunction } from "express"
import { logger } from "./logger"

// const notFound = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     logger.info("Inside notFound method")
//     if(res.statusCode !== 404){
//         next()
//     }
//     res.status(404).json({
//         message: `${err.message}, ${req.originalUrl}`
//     })
// }

const internalServerErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.info("Inside internalServerErrorHandler method")
    if(err){
        logger.error(`${req.method} ${res.statusCode} message: ${err.message} ${JSON.stringify(req.params)}`)
        res.status(res.statusCode).json({
            message: err.message,
            stack: err.stack
        });
    }
    next()
}

export {
    // notFound,
    internalServerErrorHandler
}