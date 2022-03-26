import { Router } from 'express';

import carriersRouter from './carriers';
import categoriesRouter from './categories';
import clientsRouter from './clients';
import financialRouter from './financial';
import productsRouter from './products';
import providersRouter from './providers';
import purchasesRouter from './purchases';
import salesRouter from './sales';
import sellersRouter from './sellers';
import storesRouter from './stores';
import ticketsRouter from './tickets';
import usersRouter from './users';

const routes = Router();

routes.use('/v1/carriers', carriersRouter);
routes.use('/v1/categories', categoriesRouter);
routes.use('/v1/clients', clientsRouter);
routes.use('/v1/financial', financialRouter);
routes.use('/v1/products', productsRouter);
routes.use('/v1/providers', providersRouter);
routes.use('/v1/purchases', purchasesRouter);
routes.use('/v1/sales', salesRouter);
routes.use('/v1/sellers', sellersRouter);
routes.use('/v1/stores', storesRouter);
routes.use('/v1/tickets', ticketsRouter);
routes.use('/v1/users', usersRouter);

export default routes;
