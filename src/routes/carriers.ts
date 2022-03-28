import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createCarrierController from '../modules/carriers/controllers/createCarrierController';
import * as getCarrierController from '../modules/carriers/controllers/getCarrierController';
import * as updateCarrierController from '../modules/carriers/controllers/updateCarrierController';
import * as deleteCarrierController from '../modules/carriers/controllers/deleteCarrierController';

const carriersRouter = Router();

carriersRouter.post('/', can("create_carrier"), createCarrierController.create);
carriersRouter.get('/', can("view_carrier"), getCarrierController.getAll);
carriersRouter.get('/get/', can("get_carriers"), getCarrierController.getRegisters);
carriersRouter.get('/:id', can("view_carrier"), getCarrierController.getOne);
carriersRouter.put('/:id', can("update_carrier"), updateCarrierController.updateOne);
carriersRouter.delete('/:id', can("delete_carrier"), deleteCarrierController.deleteOne);

export default carriersRouter;
