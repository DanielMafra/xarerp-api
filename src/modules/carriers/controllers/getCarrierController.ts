import { Request, Response } from 'express';
import { getCarrierService } from '../services/getCarrierService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const carriers = await getCarrierService.listAll(String(q), Number(page));

    if (!carriers) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ carriers });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carrier = await getCarrierService.findOne(id);

    if (!carrier) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ carrier });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
