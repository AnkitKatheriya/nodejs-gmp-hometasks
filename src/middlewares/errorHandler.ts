import { Request, Response, NextFunction } from "express"

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404)
    const error = new Error(`Not Found, ${req.originalUrl}`)
    next(error)
}

const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    res.status(res.statusCode || 500)
    res.json({
        message: err.message,
        stack: err.stack
    });
}

export {
    notFound,
    errorHandler
}