import { Request, Response, NextFunction } from "express"

const notFound = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(res.statusCode !== 404){
        next()
    }
    res.status(404).json({
        message: `${err.message}, ${req.originalUrl}`
    })
}

const internalServerErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent){
        console.log(`Service method: ${req.method}, Request params: ${JSON.stringify(req.params)}, Request body: ${JSON.stringify(req.body)}`)
    }
    res.status(res.statusCode || 500).json({
        message: err.message,
        stack: err.stack
    });
}

export {
    notFound,
    internalServerErrorHandler
}