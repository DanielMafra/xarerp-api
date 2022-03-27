import { Request, Response } from 'express';
import { createCategoryService } from '../services/createCategoryService';
import { getCategoryService } from '../services/getCategoryService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Category title not filled' });
    }

    const hasCategory = await getCategoryService.findByTitle(title);

    if (hasCategory.length > 0) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await createCategoryService.create({
      id: uuidV4(),
      title
    });

    if (!category) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ category });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
