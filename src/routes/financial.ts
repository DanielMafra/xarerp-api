import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createFinancialController from '../modules/financial/controllers/createFinancialController';
import * as getFinancialController from '../modules/financial/controllers/getFinancialController';
import * as updateFinancialController from '../modules/financial/controllers/updateFinancialController';
import * as deleteFinancialController from '../modules/financial/controllers/deleteFinancialController';

const financialRouter = Router();

financialRouter.post('/registers', can("create_register"), createFinancialController.create);
financialRouter.get('/registers', can("view_register"), getFinancialController.getAll);
financialRouter.get('/registers/:id', can("view_register"), getFinancialController.getOne);
financialRouter.put('/registers/:id', can("update_register"), updateFinancialController.updateOne);
financialRouter.delete('/registers/:id', can("delete_register"), deleteFinancialController.deleteOne);

export default financialRouter;
