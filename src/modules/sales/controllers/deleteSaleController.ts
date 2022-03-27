import { Request, Response } from 'express';
import { getSaleService } from '../services/getSaleService';
import { deleteSaleService } from '../services/deleteSaleService';

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const sale = await getSaleService.findOne(id);

    if (!sale) {
      return res.status(404).json({ error: 'Not found' });
    }

    await deleteSaleService.delete(id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
