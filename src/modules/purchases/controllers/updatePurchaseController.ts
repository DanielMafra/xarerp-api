import { Request, Response } from 'express';
import { getPurchaseService } from '../services/getPurchaseService';
import { getUserService } from '../../users/services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getProviderService } from '../../providers/services/getProviderService';
import { getProductService } from '../../products/services/getProductService';
import { updatePurchaseService } from '../services/updatePurchaseService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { unity, provider, product, quantity, unit_price, status } = req.body;

  if (!unity && !provider && !product && !quantity && !unit_price && status === '') {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const purchase = await getPurchaseService.findOne(id);

  if (!purchase) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (unity) {
    const hasStore = await getStoreService.findOne(unity);

  if (!hasStore) {
    return res.status(404).json({ error: 'Store not found' });
  }
  }

  if (provider) {
    const hasProvider = await getProviderService.findOne(provider);

  if (!hasProvider) {
    return res.status(404).json({ error: 'Provider not found' });
  }
  }

  if (product) {
    const hasProduct = await getProductService.findOne(product);

  if (!hasProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  }

  const time = new Date().toISOString();

  const purchaseUpdated = await updatePurchaseService.update({
    id,
    data: {
      unity_id: unity,
      provider_id: provider,
      product_id: product,
      quantity,
      unit_price,
      status
    },
    time
  });

  if (!purchaseUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ purchase: purchaseUpdated });
}
