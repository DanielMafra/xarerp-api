import { Request, Response } from 'express';
import { updateCategoryService } from '../services/updateCategoryService';
import { getCategoryService } from '../services/getCategoryService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Category title not filled' });
  }

  const category = await getCategoryService.findOne(id);

  if (!category) {
    return res.status(404).json({ error: 'Not found' });
  }

  const hasCategory = await getCategoryService.findByTitle(title);

  if (hasCategory.length > 0) {
    return res.status(400).json({ error: 'Category already exists' });
  }

  const time = new Date().toISOString();

  const categoryUpdated = await updateCategoryService.update(id, title, time);

  if (!categoryUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ category: categoryUpdated });
}
