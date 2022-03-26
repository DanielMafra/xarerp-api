import { Request, Response } from 'express';
import { getSellerService } from '../services/getSellerService';
import { deleteSellerService } from '../services/deleteSellerService';

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const seller = await getSellerService.findOne(id);

  if (!seller) {
    return res.status(404).json({ error: 'Not found' });
  }

  await deleteSellerService.delete(id);

  return res.status(200).json({ status: true });
}
