import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createTicketController from '../modules/tickets/controllers/createTicketController';
import * as getTicketController from '../modules/tickets/controllers/getTicketController';
import * as updateTicketController from '../modules/tickets/controllers/updateTicketController';
import * as deleteTicketController from '../modules/tickets/controllers/deleteTicketController';

const ticketsRouter = Router();

ticketsRouter.post('/', can("create_ticket"), createTicketController.create);
ticketsRouter.get('/', can("view_ticket"), getTicketController.getAll);
ticketsRouter.get('/:id', can("view_ticket"), getTicketController.getOne);
ticketsRouter.put('/:id', can("update_ticket"), updateTicketController.updateOne);
ticketsRouter.delete('/:id', can("delete_ticket"), deleteTicketController.deleteOne);

export default ticketsRouter;
