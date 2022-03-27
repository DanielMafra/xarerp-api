import { Request, Response } from 'express';
import { getStoreService } from '../services/getStoreService';
import { updateStoreService } from '../services/updateStoreService';

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;

    if (!name && !type) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const store = await getStoreService.findOne(id);

    if (!store) {
      return res.status(404).json({ error: 'Not found' });
    }

    const time = new Date().toISOString();

    const storeUpdated = await updateStoreService.update({
      id,
      data: {
        name,
        type
      },
      time
    });

    if (!storeUpdated) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ store: storeUpdated });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
