import { Request, Response } from 'express';
import { getFinancialService } from '../services/getFinancialService';
import { deleteFinancialService } from '../services/deleteFinancialService';

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const financial = await getFinancialService.findOne(id);

    if (!financial) {
      return res.status(404).json({ error: 'Not found' });
    }

    await deleteFinancialService.delete(id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
