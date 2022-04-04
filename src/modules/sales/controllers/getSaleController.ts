import { Request, Response } from 'express';
import { getSaleService } from '../services/getSaleService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const sales = await getSaleService.listAll(String(q), Number(page));

    if (!sales) {
      return res.status(404).json({ error: 'Not found' });
    }

    let newArray = [];
    let returnedSales = [];
    returnedSales.push(sales[0]);

    for (let i = 0; i < sales[1].length; i++) {
      newArray.push({
        id: sales[1][i].id,
        product_id: sales[1][i].product_id,
        product_name: sales[1][i].product.name,
        product_description: sales[1][i].product.description,
        unity_id: sales[1][i].unity_id,
        unity: sales[1][i].unity.name,
        client_id: sales[1][i].client_id,
        client_name: sales[1][i].client.name,
        client_city: sales[1][i].client.city,
        client_state: sales[1][i].client.state,
        seller_id: sales[1][i].seller_id,
        seller: sales[1][i].seller.user.name,
        carrier_id: sales[1][i].carrier_id,
        carrier: sales[1][i].carrier.name,
        quantity: sales[1][i].quantity,
        status: sales[1][i].status,
        created_at: sales[1][i].created_at,
        updated_at: sales[1][i].updated_at,
      })
    }

    returnedSales.push(newArray);

    return res.status(200).json({ sales: returnedSales });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sale = await getSaleService.findOne(id);

    if (!sale) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ sale });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
