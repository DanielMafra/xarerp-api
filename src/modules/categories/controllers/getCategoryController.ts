import { Request, Response } from 'express';
import { getCategoryService } from '../services/getCategoryService';

export const getAll = async (req: Request, res: Response) => {
  const categories = await getCategoryService.findAll();

  if (!categories) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ categories });
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await getCategoryService.findOne(id);

  if (!category) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ category });
}
