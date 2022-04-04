import { Request, Response } from 'express';
import { getProductService } from '../../products/services/getProductService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getClientService } from '../../clients/services/getClientService';
import { getSellerService } from '../../sellers/services/getSellerService';
import { getCarrierService } from '../../carriers/services/getCarrierService';
import { updateProductService } from '../../products/services/updateProductService';
import { createSaleService } from '../services/createSaleService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  try {
    const { product, unity, client, seller, carrier, quantity } = req.body;

    if (!product || !unity || !client || !seller || !carrier || !quantity) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const hasProduct = await getProductService.findOne(product);

    if (!hasProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const hasStore = await getStoreService.findOne(unity);

    if (!hasStore) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const hasClient = await getClientService.findOne(client);

    if (!hasClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const hasSeller = await getSellerService.findOne(seller);

    if (!hasSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    const hasCarrier = await getCarrierService.findOne(carrier);

    if (!hasCarrier) {
      return res.status(404).json({ error: 'Carrier not found' });
    }

    const sale = await createSaleService.create({
      id: uuidV4(),
      product,
      unity,
      client,
      seller,
      carrier,
      quantity,
      status: 0
    });

    if (!sale) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    const time = new Date().toISOString();

    await updateProductService.update({
      id: hasProduct.id,
      data: {
        sold_amount: hasProduct.sold_amount + quantity
      },
      time
    });

    return res.status(201).json({ sale });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
