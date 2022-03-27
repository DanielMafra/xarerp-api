import { Request, Response } from 'express';
import { deleteProviderService } from '../../providers/services/deleteProviderService';
import { getProviderService } from '../../providers/services/getProviderService';

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const provider = await getProviderService.findOne(id);

    if (!provider) {
      return res.status(404).json({ error: 'Not found' });
    }

    await deleteProviderService.delete(id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
