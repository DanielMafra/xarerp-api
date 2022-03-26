import { Request, Response } from 'express';
import { getPurchaseService } from '../services/getPurchaseService';

export const getAll = async (req: Request, res: Response) => {
  const { page, q } = req.query;

  const purchases = await getPurchaseService.listAll(String(q), Number(page));

  if (!purchases) {
    return res.status(404).json({ error: 'Not found' });
  }

  let newArray = [];
  let returnedPurchases = [];
  returnedPurchases.push(purchases[0]);

  for (let i = 0; i < purchases[1].length; i++) {
    newArray.push({
      id: purchases[1][i].id,
      user_id: purchases[1][i].user_id,
      user: purchases[1][i].user.name,
      unity_id: purchases[1][i].unity_id,
      unity: purchases[1][i].unity.name,
      provider_id: purchases[1][i].provider_id,
      provider: purchases[1][i].provider.name,
      product_id: purchases[1][i].product_id,
      product_name: purchases[1][i].product.name,
      product_description: purchases[1][i].product.description,
      quantity: purchases[1][i].quantity,
      unit_price: purchases[1][i].unit_price,
      unit_price_formatted: `${purchases[1][i].unit_price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`,
      status: purchases[1][i].status,
      created_at: purchases[1][i].created_at,
      updated_at: purchases[1][i].updated_at,
    })
  }

  returnedPurchases.push(newArray);

  return res.status(200).json({ purchases: returnedPurchases });
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const purchase = await getPurchaseService.findOne(id);

  if (!purchase) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ purchase });
}
