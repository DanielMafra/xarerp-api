import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as getDashboardController from '../modules/dashboard/controllers/getDashboardController';

const dashboardRouter = Router();

dashboardRouter.get('/', can("view_dashboard"), getDashboardController.getData);

export default dashboardRouter;
