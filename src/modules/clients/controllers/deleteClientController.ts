import { Request, Response } from 'express';
import { getClientService } from '../services/getClientService';
import { deleteClientService } from '../services/deleteClientService';

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await getClientService.findOne(id);

    if (!client) {
      return res.status(404).json({ error: 'Not found' });
    }

    await deleteClientService.delete(id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
