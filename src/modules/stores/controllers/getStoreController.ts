import { Request, Response } from 'express';
import { getStoreService } from '../services/getStoreService';

export const getAll = async (req: Request, res: Response) => {
  const { page, q } = req.query;

  const stores = await getStoreService.listAll(String(q), Number(page));

  if (!stores) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ stores });
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const store = await getStoreService.findOne(id);

  if (!store) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ store });
}

