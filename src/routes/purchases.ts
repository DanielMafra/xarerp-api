import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createPurchaseController from '../modules/purchases/controllers/createPurchaseController';
import * as getPurchaseController from '../modules/purchases/controllers/getPurchaseController';
import * as updatePurchaseController from '../modules/purchases/controllers/updatePurchaseController';
import * as deletePurchaseController from '../modules/purchases/controllers/deletePurchaseController';

const purchasesRouter = Router();

purchasesRouter.post('/', can("create_purchase"), createPurchaseController.create);
purchasesRouter.get('/', can("view_purchase"), getPurchaseController.getAll);
purchasesRouter.get('/:id', can("view_purchase"), getPurchaseController.getOne);
purchasesRouter.put('/:id', can("update_purchase"), updatePurchaseController.updateOne);
purchasesRouter.delete('/:id', can("delete_purchase"), deletePurchaseController.deleteOne);

export default purchasesRouter;
