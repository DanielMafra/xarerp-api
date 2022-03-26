import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createSellerController from '../modules/sellers/controllers/createSellerController';
import * as getSellerController from '../modules/sellers/controllers/getSellerController';
import * as updateSellerController from '../modules/sellers/controllers/updateSellerController';
import * as deleteSellerController from '../modules/sellers/controllers/deleteSellerController';

const sellersRouter = Router();

sellersRouter.post('/', can("create_seller"), createSellerController.create);
sellersRouter.get('/', can("view_seller"), getSellerController.getAll);
sellersRouter.get('/:id', can("view_seller"), getSellerController.getOne);
sellersRouter.put('/:id', can("update_seller"), updateSellerController.updateOne);
sellersRouter.delete('/:id', can("delete_seller"), deleteSellerController.deleteOne);

export default sellersRouter;
