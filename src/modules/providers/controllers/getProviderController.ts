import { Request, Response } from 'express';
import { getProviderService } from '../../providers/services/getProviderService';

export const getAll = async (req: Request, res: Response) => {
  const { page, q } = req.query;

  const providers = await getProviderService.listAll(String(q), Number(page));

  if (!providers) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ providers });
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const provider = await getProviderService.findOne(id);

  if (!provider) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ provider });
}
