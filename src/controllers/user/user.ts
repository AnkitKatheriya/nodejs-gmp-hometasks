import { Request, Response, NextFunction } from "express"
import { ValidatedRequest } from "express-joi-validation"
import HttpStatus from "http-status-codes";
import { ICreateUserRequestSchema, IAutoSearchUserSchema, IUpdateUserRequestSchema } from "../../schemas"
import { UserService } from "../../services"
import { logger } from "../../middlewares"

class UserController {
    private userService: UserService
    constructor(userService: UserService = new UserService()){
        this.userService = userService
    }

    getAllUsers = async (req: ValidatedRequest<IAutoSearchUserSchema>, res: Response, next: NextFunction) => {
        try {
            const { loginSubstring, limit } = await req.body
            const autoSuggestedUsers = await this.userService.findAll(loginSubstring, limit)
            res.status(HttpStatus.OK).send({ data: autoSuggestedUsers })
        } catch(error) {
            next(error)
        }
    }

    getUserById = async (req: Request, res: Response) => {
            const { id } = req.params
            await this.userService.findByid(id).then(user => {
                if(!user){
                    res.status(HttpStatus.NOT_FOUND).json({
                        error: 'User does not exists',
                    })
                }
                res.status(HttpStatus.OK).send({ data: user })
            }).catch((err) => {
                logger.error(err)
                res.status(res.statusCode).json({
                    error: err.message
                })
            })
    }

    createUser = async (req: ValidatedRequest<ICreateUserRequestSchema>, res: Response, next: NextFunction) => {
        try {
            const newUser = await this.userService.create(req.body);
            res.status(HttpStatus.CREATED).send({data: newUser, message: 'User created successfully'});
        } catch(error) {
            next(error)
        }
    }

    updateUser = async (req: ValidatedRequest<IUpdateUserRequestSchema>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const updatedUser = await this.userService.update(id, req.body)
            if(Object.keys(updatedUser).length < 1){
                const error = new Error('User not found')
                next(error)
            }
            res.status(HttpStatus.OK).send({ data: updatedUser, message: 'User updated successfully'})
        } catch(error) {
            next(error)
        } 
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const deletedUser = await this.userService.delete(id)
            if(Object.keys(deletedUser).length < 1){
                const error = new Error('User not found')
                next(error)
            }
            res.status(HttpStatus.OK).send({ message: 'User deleted successfully'})
        } catch(error) {
            next(error)
        }
    }

    createBulkUsers = async(req: Request, res: Response, next: NextFunction) => {
        try {
            await this.userService.createBulkUsers()
        } catch(error) {
            console.log('\n\n\n@@@@@error\n', error)
            next(error)
        }
    }
}

export {
    UserController
}