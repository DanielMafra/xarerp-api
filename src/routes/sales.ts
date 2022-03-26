import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createSaleController from '../modules/sales/controllers/createSaleController';
import * as getSaleController from '../modules/sales/controllers/getSaleController';
import * as updateSaleController from '../modules/sales/controllers/updateSaleController';
import * as deleteSaleController from '../modules/sales/controllers/deleteSaleController';

const salesRouter = Router();

salesRouter.post('/', can("create_sale"), createSaleController.create);
salesRouter.get('/', can("view_sale"), getSaleController.getAll);
salesRouter.get('/:id', can("view_sale"), getSaleController.getOne);
salesRouter.put('/:id', can("update_sale"), updateSaleController.updateOne);
salesRouter.delete('/:id', can("delete_sale"), deleteSaleController.deleteOne);

export default salesRouter;
