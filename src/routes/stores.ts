import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createStoreController from '../modules/stores/controllers/createStoreController';
import * as getStoreController from '../modules/stores/controllers/getStoreController';
import * as updateStoreController from '../modules/stores/controllers/updateStoreController';
import * as deleteStoreController from '../modules/stores/controllers/deleteStoreController';

const storesRouter = Router();

storesRouter.post('/', can("create_store"), createStoreController.create);
storesRouter.get('/', can("view_store"), getStoreController.getAll);
storesRouter.get('/:id', can("view_store"), getStoreController.getOne);
storesRouter.put('/:id', can("update_store"), updateStoreController.updateOne);
storesRouter.delete('/:id', can("delete_store"), deleteStoreController.deleteOne);

export default storesRouter;
