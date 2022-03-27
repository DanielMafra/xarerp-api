import { Request, Response } from 'express';
import { getProductService } from '../services/getProductService';
import { updateProductService } from '../services/updateProductService';
import { getCategoryService } from '../../categories/services/getCategoryService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getProviderService } from '../../providers/services/getProviderService';

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, purchase_price, sale_price, category, unity, provider, lot, validity, quantity } = req.body;

    if (!name && !description && !purchase_price && !sale_price && !category && !unity && !provider && !lot && !validity && !quantity) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const product = await getProductService.findOne(id);

    if (!product) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (category) {
      const hasCategory = await getCategoryService.findOne(category);

      if (!hasCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
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

    const time = new Date().toISOString();
    const validityToDate = new Date(validity);

    const productUpdated = await updateProductService.update({
      id,
      data: {
        name,
        description,
        purchase_price,
        sale_price,
        category_id: category,
        unity_id: unity,
        provider_id: provider,
        lot,
        validity: validityToDate,
        quantity
      },
      time
    });

    if (!productUpdated) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ product: productUpdated });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
