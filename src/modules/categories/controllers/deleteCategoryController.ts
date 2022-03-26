import { Request, Response } from 'express';
import { deleteCategoryService } from '../services/deleteCategoryService';
import { getCategoryService } from '../services/getCategoryService';

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await getCategoryService.findOne(id);

  if (!category) {
    return res.status(404).json({ error: 'Not found' });
  }

  await deleteCategoryService.delete(id);

  return res.status(200).json({ status: true });
}
