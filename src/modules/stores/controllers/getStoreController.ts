import { Request, Response } from 'express';
import { getStoreService } from '../services/getStoreService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const stores = await getStoreService.listAll(String(q), Number(page));

    if (!stores) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ stores });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const store = await getStoreService.findOne(id);

    if (!store) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ store });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

