import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createUserController from '../modules/users/controllers/createUserController';
import * as getUserController from '../modules/users/controllers/getUserController';
import * as updateUserController from '../modules/users/controllers/updateUserController';
import * as deleteUserController from '../modules/users/controllers/deleteUserController';

const usersRouter = Router();

usersRouter.post('/', can("create_user"), createUserController.create);
usersRouter.get('/', can("view_user"), getUserController.getAll);
usersRouter.get('/:id', can("view_user"), getUserController.getOne);
usersRouter.put('/:id', can("update_user"), updateUserController.updateOne);
usersRouter.delete('/:id', can("delete_user"), deleteUserController.deleteOne);

export default usersRouter;
