import { Request, Response } from 'express';
import { getProviderService } from '../../providers/services/getProviderService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const providers = await getProviderService.listAll(String(q), Number(page));

    if (!providers) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ providers });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const provider = await getProviderService.findOne(id);

    if (!provider) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ provider });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
