import { Request, Response } from 'express';
import { getProductService } from '../services/getProductService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const products = await getProductService.listAll(String(q), Number(page));

    if (!products) {
      return res.status(404).json({ error: 'Not found' });
    }

    let newArray = [];
    let returnedProducts = [];
    returnedProducts.push(products[0]);

    const formatValidity = (validity: Date) => {
      return `${validity.getUTCFullYear()}-${(validity.getUTCMonth() + 1).toString().padStart(2, '0')}-${validity.getUTCDate().toString().padStart(2, '0')}`;
    }

    for (let i = 0; i < products[1].length; i++) {
      newArray.push({
        id: products[1][i].id,
        name: products[1][i].name,
        description: products[1][i].description,
        purchase_price: products[1][i].purchase_price,
        purchase_price_formatted: `${products[1][i].purchase_price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
        sale_price: products[1][i].sale_price,
        sale_price_formatted: `${products[1][i].sale_price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
        category_id: products[1][i].category_id,
        category: products[1][i].category.title,
        unity_id: products[1][i].unity_id,
        unity: products[1][i].unity.name,
        provider_id: products[1][i].provider_id,
        provider: products[1][i].provider.name,
        user_id: products[1][i].user_id,
        user: products[1][i].user.name,
        lot: products[1][i].lot,
        validity: formatValidity(products[1][i].validity),
        quantity: products[1][i].quantity,
        created_at: products[1][i].created_at,
        updated_at: products[1][i].updated_at,
      })
    }

    returnedProducts.push(newArray);

    return res.status(200).json({ products: returnedProducts });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getRegisters = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const products = await getProductService.listAll(String(q), Number(page));

    if (!products) {
      return res.status(404).json({ error: 'Not found' });
    }

    let newArray = [];
    let returnedProducts = [];
    returnedProducts.push(products[0]);

    for (let i = 0; i < products[1].length; i++) {
      newArray.push({
        id: products[1][i].id,
        name: products[1][i].name,
        description: products[1][i].description,
        purchase_price: products[1][i].purchase_price,
        purchase_price_formatted: `${products[1][i].purchase_price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
        sale_price: products[1][i].sale_price,
        sale_price_formatted: `${products[1][i].sale_price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
        category_id: products[1][i].category_id,
        category: products[1][i].category.title,
        unity_id: products[1][i].unity_id,
        unity: products[1][i].unity.name,
        provider_id: products[1][i].provider_id,
        provider: products[1][i].provider.name,
        user_id: products[1][i].user_id,
        user: products[1][i].user.name,
        lot: products[1][i].lot,
        validity: products[1][i].validity,
        quantity: products[1][i].quantity,
        created_at: products[1][i].created_at,
        updated_at: products[1][i].updated_at,
      })
    }

    returnedProducts.push(newArray);

    return res.status(200).json({ products: returnedProducts });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductService.findOne(id);

    if (!product) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ product });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
