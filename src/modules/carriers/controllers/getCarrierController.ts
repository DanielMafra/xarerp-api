import { Request, Response } from 'express';
import { getCarrierService } from '../services/getCarrierService';

export const getAll = async (req: Request, res: Response) => {
  const { page, q } = req.query;

  const carriers = await getCarrierService.listAll(String(q), Number(page));

  if (!carriers) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ carriers });
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const carrier = await getCarrierService.findOne(id);

  if (!carrier) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ carrier });
}
