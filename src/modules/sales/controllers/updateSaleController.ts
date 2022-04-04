import { Request, Response } from 'express';
import { getSaleService } from '../services/getSaleService';
import { getProductService } from '../../products/services/getProductService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getClientService } from '../../clients/services/getClientService';
import { getSellerService } from '../../sellers/services/getSellerService';
import { getCarrierService } from '../../carriers/services/getCarrierService';
import { updateSaleService } from '../services/updateSaleService';

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { product, unity, client, seller, carrier, quantity, status } = req.body;

    if (!product && !unity && !client && !seller && !carrier && !quantity && status === '') {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const sale = await getSaleService.findOne(id);

    if (!sale) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (product) {
      const hasProduct = await getProductService.findOne(product);

      if (!hasProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
    }

    if (unity) {
      const hasStore = await getStoreService.findOne(unity);

      if (!hasStore) {
        return res.status(404).json({ error: 'Store not found' });
      }
    }

    if (client) {
      const hasClient = await getClientService.findOne(client);

      if (!hasClient) {
        return res.status(404).json({ error: 'Client not found' });
      }
    }

    if (seller) {
      const hasSeller = await getSellerService.findOne(seller);

      if (!hasSeller) {
        return res.status(404).json({ error: 'Seller not found' });
      }
    }

    if (carrier) {
      const hasCarrier = await getCarrierService.findOne(carrier);

      if (!hasCarrier) {
        return res.status(404).json({ error: 'Carrier not found' });
      }
    }

    const time = new Date().toISOString();

    const saleUpdated = await updateSaleService.update({
      id,
      data: {
        product_id: product,
        unity_id: unity,
        client_id: client,
        seller_id: seller,
        carrier_id: carrier,
        quantity,
        status
      },
      time
    });

    if (!saleUpdated) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ sale: saleUpdated });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
