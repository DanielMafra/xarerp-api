import { Request, Response } from 'express';
import { getProductService } from '../services/getProductService';
import { deleteProductService } from '../services/deleteProductService';

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProductService.findOne(id);

    if (!product) {
      return res.status(404).json({ error: 'Not found' });
    }

    await deleteProductService.delete(id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
