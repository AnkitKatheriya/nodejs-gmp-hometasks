import { Router } from "express";
import { UserController } from "../controllers"

export const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.post('/', userController.createUser)

userRouter.put('/:id', userController.updateUser)

userRouter.delete('/:id', userController.deleteUser)

userRouter.get('/auto-suggest', userController.getAllUsers)
