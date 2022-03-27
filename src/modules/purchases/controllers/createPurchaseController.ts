import { Request, Response } from 'express';
import { getUserService } from '../../users/services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getProviderService } from '../../providers/services/getProviderService';
import { getProductService } from '../../products/services/getProductService';
import { createPurchaseService } from '../services/createPurchaseService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  try {
    const { unity, provider, product, quantity, unit_price } = req.body;
    const user = req.userId;

    if (!unity || !provider || !product || !quantity || !unit_price) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const hasUser = await getUserService.findOne(user);

    if (!hasUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hasStore = await getStoreService.findOne(unity);

    if (!hasStore) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const hasProvider = await getProviderService.findOne(provider);

    if (!hasProvider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    const hasProduct = await getProductService.findOne(product);

    if (!hasProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const purchase = await createPurchaseService.create({
      id: uuidV4(),
      user,
      unity,
      provider,
      product,
      quantity,
      unit_price,
      status: 0
    });

    if (!purchase) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ purchase });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
