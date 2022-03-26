import { Request, Response } from 'express';
import { createProviderService } from '../../providers/services/createProviderService';
import { getProviderService } from '../../providers/services/getProviderService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  const { name, email, tel } = req.body;

  if (!name || !email || !tel) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const hasProviderByEmail = await getProviderService.findByEmail(email);

  if (hasProviderByEmail.length > 0) {
    return res.status(400).json({ error: 'Provider with this e-mail already exists' });
  }

  const hasProviderByTel = await getProviderService.findByTel(tel);

  if (hasProviderByTel.length > 0) {
    return res.status(400).json({ error: 'Provider with this tel already exists' });
  }

  const provider = await createProviderService.create({
    id: uuidV4(),
    name,
    email,
    tel
  });

  if (!provider) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(201).json({ provider });
}
