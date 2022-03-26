import { Router } from 'express';

import { can } from '../middlewares/permissions/ensurePermission';

import * as createCategoryController from '../modules/categories/controllers/createCategoryController';
import * as getCategoryController from '../modules/categories/controllers/getCategoryController';
import * as updateCategoryController from '../modules/categories/controllers/updateCategoryController';
import * as deleteCategoryController from '../modules/categories/controllers/deleteCategoryController';

const categoriesRouter = Router();

categoriesRouter.post('/', can("create_category"), createCategoryController.create);
categoriesRouter.get('/', can("view_category"), getCategoryController.getAll);
categoriesRouter.get('/:id', can("view_category"), getCategoryController.getOne);
categoriesRouter.put('/:id', can("update_category"), updateCategoryController.updateOne);
categoriesRouter.delete('/:id', can("delete_category"), deleteCategoryController.deleteOne);

export default categoriesRouter;
