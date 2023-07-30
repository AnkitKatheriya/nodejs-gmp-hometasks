import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import { GroupController } from '../controllers';
import { groupCreateSchema, groupUpdatedSchema } from '../schemas';

export const groupRouter = Router();
const validator = createValidator();

const groupController = new GroupController();

groupRouter.post('/addUsersToGroup', groupController.addUsersToGroup);

groupRouter.get('/', groupController.getAllGropus);

groupRouter.get('/:id', groupController.getGroupById);

groupRouter.post(
  '/',
  validator.body(groupCreateSchema),
  groupController.createGroup
);

groupRouter.put(
  '/:id',
  validator.body(groupUpdatedSchema),
  groupController.updateGroup
);

groupRouter.delete('/:id', groupController.deleteGroup);
