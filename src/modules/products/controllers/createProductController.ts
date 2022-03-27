import { Request, Response } from 'express';
import { createProductService } from '../services/createProductService';
import { getCategoryService } from '../../categories/services/getCategoryService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getProviderService } from '../../providers/services/getProviderService';
import { getUserService } from '../../users/services/getUserService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, description, purchase_price, sale_price, category, unity, provider, lot, validity, quantity } = req.body;
    const user = req.userId;

    if (!name || !description || !purchase_price || !sale_price || !category || !unity || !provider || !lot || !validity || !quantity) {
      return res.status(400).json({ error: 'Incomplete data' });
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

    const validityToDate = new Date(validity);

    const product = await createProductService.create({
      id: uuidV4(),
      name,
      description,
      purchase_price,
      sale_price,
      category,
      unity,
      provider,
      user,
      lot,
      validity: validityToDate,
      quantity
    });

    if (!product) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ product });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
