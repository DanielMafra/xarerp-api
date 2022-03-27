import { Request, Response } from 'express';
import { deleteCarrierService } from '../services/deleteCarrierService';
import { getCarrierService } from '../services/getCarrierService';

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

  const carrier = await getCarrierService.findOne(id);

  if (!carrier) {
    return res.status(404).json({ error: 'Not found' });
  }

  await deleteCarrierService.delete(id);

  return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
