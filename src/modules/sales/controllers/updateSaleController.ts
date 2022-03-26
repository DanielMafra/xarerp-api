import { Request, Response } from 'express';
import { getSaleService } from '../services/getSaleService';
import { getProductService } from '../../products/services/getProductService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getClientService } from '../../clients/services/getClientService';
import { getSellerService } from '../../sellers/services/getSellerService';
import { getCarrierService } from '../../carriers/services/getCarrierService';
import { updateSaleService } from '../services/updateSaleService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product, unity, client, seller, carrier, status } = req.body;

  if (!product || !unity || !client || !seller || !carrier || status === '') {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const sale = await getSaleService.findOne(id);

  if (!sale) {
    return res.status(404).json({ error: 'Not found' });
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

  const time = new Date().toISOString();

  const saleUpdated = await updateSaleService.update(id, product, unity, client, seller, carrier, status, time);

  if (!saleUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ sale: saleUpdated });
}
