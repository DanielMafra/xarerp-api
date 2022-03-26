import { Request, Response } from 'express';
import { getProductService } from '../services/getProductService';
import { updateProductService } from '../services/updateProductService';
import { getCategoryService } from '../../categories/services/getCategoryService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getProviderService } from '../../providers/services/getProviderService';
import { getUserService } from '../../users/services/getUserService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, purchase_price, sale_price, category, unity, provider, user, lot, validity, quantity } = req.body;

  if (!name || !description || !purchase_price || !sale_price || !category || !unity || !provider || !user || !lot || !validity || !quantity) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const product = await getProductService.findOne(id);

  if (!product) {
    return res.status(404).json({ error: 'Not found' });
  }

  const hasCategory = await getCategoryService.findOne(category);

  if (!hasCategory) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const hasStore = await getStoreService.findOne(unity);

  if (!hasStore) {
    return res.status(404).json({ error: 'Store not found' });
  }

  const hasProvider = await getProviderService.findOne(provider);

  if (!hasProvider) {
    return res.status(404).json({ error: 'Provider not found' });
  }

  const hasUser = await getUserService.findOne(user);

  if (!hasUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  const time = new Date().toISOString();
  const validityToDate = new Date(validity);

  const productUpdated = await updateProductService.update(id, name, description, purchase_price, sale_price, category, unity, provider, user, lot, validityToDate, quantity, time);

  if (!productUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ product: productUpdated });
}
