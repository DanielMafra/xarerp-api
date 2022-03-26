import { Request, Response } from 'express';
import { createStoreService } from '../services/createStoreService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const store = await createStoreService.create({
    id: uuidV4(),
    name,
    type
  });

  if (!store) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(201).json({ store });
}
