import { Request, Response } from 'express';
import { getPurchaseService } from '../services/getPurchaseService';
import { deletePurchaseService } from '../services/deletePurchaseService';

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const purchase = await getPurchaseService.findOne(id);

    if (!purchase) {
      return res.status(404).json({ error: 'Not found' });
    }

    await deletePurchaseService.delete(id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
