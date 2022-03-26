import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createProductController from '../modules/products/controllers/createProductController';
import * as getProductController from '../modules/products/controllers/getProductController';
import * as updateProductController from '../modules/products/controllers/updateProductController';
import * as deleteProductController from '../modules/products/controllers/deleteProductController';

const productsRouter = Router();

productsRouter.post('/', can("create_product"), createProductController.create);
productsRouter.get('/', can("view_product"), getProductController.getAll);
productsRouter.get('/:id', can("view_product"), getProductController.getOne);
productsRouter.put('/:id', can("update_product"), updateProductController.updateOne);
productsRouter.delete('/:id', can("delete_product"), deleteProductController.deleteOne);

export default productsRouter;
