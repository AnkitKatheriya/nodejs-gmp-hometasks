import { Router } from "express";
import { UserController } from "../controllers"

export const userRouter = Router()

const userController = new UserController()

userRouter.get('/search', userController.getAllUsers)

userRouter.get('/insert-users-data', userController.createBulkUsers)

userRouter.get('/', userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.post('/', userController.createUser)

userRouter.put('/:id', userController.updateUser)

userRouter.delete('/:id', userController.deleteUser)
