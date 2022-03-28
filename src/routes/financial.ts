import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createFinancialController from '../modules/financial/controllers/createFinancialController';
import * as getFinancialController from '../modules/financial/controllers/getFinancialController';
import * as updateFinancialController from '../modules/financial/controllers/updateFinancialController';
import * as deleteFinancialController from '../modules/financial/controllers/deleteFinancialController';

const financialRouter = Router();

financialRouter.post('/registers', can("create_financial"), createFinancialController.create);
financialRouter.get('/registers', can("view_financial"), getFinancialController.getAll);
financialRouter.get('/registers/:id', can("view_financial"), getFinancialController.getOne);
financialRouter.put('/registers/:id', can("update_financial"), updateFinancialController.updateOne);
financialRouter.delete('/registers/:id', can("delete_financial"), deleteFinancialController.deleteOne);

export default financialRouter;
