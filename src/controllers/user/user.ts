import { Request, Response, NextFunction, response } from "express"
import { ValidatedRequest } from "express-joi-validation"
const HttpStatus = require('http-status-codes');
import { IUserRequestSchema } from "../../schemas/UserSchema"
// import { UserModel } from "../../models"
import { UserService } from "../../services"

class UserController {
    private userService: UserService
    constructor(userService: UserService = new UserService()){
        this.userService = userService
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { loginSubstring, limit } = req.body
            const autoSuggestedUsers = this.userService.findAll(loginSubstring, limit)
            res.status(HttpStatus.OK).send({ data: autoSuggestedUsers })
        } catch(error) {
            next(error)
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const user = await this.userService.findByid(id)
            if(!user){
                const error = new Error('User does not exists')
                return next(error)
            }
            res.status(HttpStatus.OK).send({ data: user })
        } catch(error) {
            next(error)
        }
    }

    createUser = async (req: ValidatedRequest<IUserRequestSchema>, res: Response, next: NextFunction) => {
        try {
            const newUser = await this.userService.create(req.body);
            res.status(HttpStatus.CREATED).send({data: newUser, message: 'User created successfully'});
        } catch(error) {
            next(error)
        }
    }

    updateUser = async (req: ValidatedRequest<IUserRequestSchema>, res: Response, next: NextFunction) => {
        try {
            //need to complete logic
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

    
}

export {
    UserController
}