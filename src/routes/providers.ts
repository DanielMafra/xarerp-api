import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createProviderController from '../modules/providers/controllers/createProviderController';
import * as getProviderController from '../modules/providers/controllers/getProviderController';
import * as updateProviderController from '../modules/providers/controllers/updateProviderController';
import * as deleteProviderController from '../modules/providers/controllers/deleteProviderController';

const providersRouter = Router();

providersRouter.post('/', can("create_provider"), createProviderController.create);
providersRouter.get('/', can("view_provider"), getProviderController.getAll);
providersRouter.get('/:id', can("view_provider"), getProviderController.getOne);
providersRouter.put('/:id', can("update_provider"), updateProviderController.updateOne);
providersRouter.delete('/:id', can("delete_provider"), deleteProviderController.deleteOne);

export default providersRouter;
