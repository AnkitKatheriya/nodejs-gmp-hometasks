import { Router } from "express";
import { GroupController } from "../controllers";

export const groupRouter = Router()

const groupController = new GroupController()

groupRouter.post('/addUsersToGroup', groupController.addUsersToGroup)

groupRouter.get('/', groupController.getAllGropus)

groupRouter.get('/:id', groupController.getGroupById)

groupRouter.post('/', groupController.createGroup)

groupRouter.put('/:id', groupController.updateGroup)

groupRouter.delete('/:id', groupController.deleteGroup)


