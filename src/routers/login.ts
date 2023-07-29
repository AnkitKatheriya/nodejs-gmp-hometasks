import { Router } from "express"
import { createValidator } from "express-joi-validation"

import { LoginController } from "../controllers"
import { getLoginSchema } from "../schemas/LoginSchema"

const loginRouter = Router()
const loginController = new LoginController()
const validator = createValidator()

loginRouter.get("/", validator.body(getLoginSchema),loginController.login)

export {
    loginRouter
}