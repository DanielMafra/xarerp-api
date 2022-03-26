import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createClientController from '../modules/clients/controllers/createClientController';
import * as getClientController from '../modules/clients/controllers/getClientController';
import * as updateClientController from '../modules/clients/controllers/updateClientController';
import * as deleteClientController from '../modules/clients/controllers/deleteClientController';

const clientsRouter = Router();

clientsRouter.post('/', can("create_client"), createClientController.create);
clientsRouter.get('/', can("view_client"), getClientController.getAll);
clientsRouter.get('/:id', can("view_client"), getClientController.getOne);
clientsRouter.put('/:id', can("update_client"), updateClientController.updateOne);
clientsRouter.delete('/:id', can("delete_client"), deleteClientController.deleteOne);

export default clientsRouter;
