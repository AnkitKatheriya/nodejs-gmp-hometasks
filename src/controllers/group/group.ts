import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { ValidatedRequest } from 'express-joi-validation';

import {
  ICreateGroupRequestSchema,
  IUpdateGroupRequestSchema,
} from '../../schemas';
import { GroupService } from '../../services';
import { logger } from '../../middlewares';

class GroupController {
  private groupService: GroupService;
  constructor(groupService = new GroupService()) {
    this.groupService = groupService;
  }

  getAllGropus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.findAll();
      res.status(HttpStatus.OK).send({ data: groups });
    } catch (error) {
      next(error);
    }
  };

  getGroupById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.groupService
      .findByid(id)
      .then(group => {
        if (!group) {
          res.status(HttpStatus.NOT_FOUND).json({
            error: 'Group does not exists',
          });
        }
        res.status(HttpStatus.OK).send({ data: group });
      })
      .catch(err => {
        logger.error(err);
        res.status(res.statusCode).json({
          error: err.message,
        });
      });
  };

  createGroup = async (
    req: ValidatedRequest<ICreateGroupRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newUser = await this.groupService.create(req.body);
      res
        .status(HttpStatus.CREATED)
        .send({ data: newUser, message: 'Group created successfully' });
    } catch (error) {
      next(error);
    }
  };

  updateGroup = async (
    req: ValidatedRequest<IUpdateGroupRequestSchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const updatedGroup = await this.groupService.update(id, req.body);
      if (Object.keys(updatedGroup).length < 1) {
        const error = new Error('Group not found');
        next(error);
      }
      res
        .status(HttpStatus.OK)
        .send({ data: updatedGroup, message: 'Group updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedGroup = await this.groupService.delete(id);
      if (Object.keys(deletedGroup).length < 1) {
        const error = new Error('Group not found');
        next(error);
      }
      res.status(HttpStatus.OK).send({ message: 'Group deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { groupId, userIds } = req.body;
    try {
      const group = await this.groupService.addUsersToGroup(groupId, userIds);
      res
        .status(HttpStatus.CREATED)
        .send({ group: group, message: 'Users added to group successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export { GroupController };
