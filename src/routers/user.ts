import { Router } from "express";
import { createValidator } from "express-joi-validation";

import { UserController } from "../controllers"
import { userCreateSchema, userAutoSearchSchema } from "../schemas";

export const userRouter = Router()

const userController = new UserController()
const validator = createValidator()

userRouter.get('/search', validator.body(userAutoSearchSchema), userController.getAllUsers)

userRouter.get('/insert-users-data', userController.createBulkUsers)

userRouter.get('/', userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.post('/', validator.body(userCreateSchema), userController.createUser)

userRouter.put('/:id', userController.updateUser)

userRouter.delete('/:id', userController.deleteUser)
