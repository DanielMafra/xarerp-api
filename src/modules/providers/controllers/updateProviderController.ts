import { Request, Response } from 'express';
import { updateProviderService } from '../../providers/services/updateProviderService';
import { getProviderService } from '../../providers/services/getProviderService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, tel } = req.body;

  if (!name && !email && !tel) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const provider = await getProviderService.findOne(id);

  if (!provider) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (email) {
    const hasProviderByEmail = await getProviderService.findByEmail(email);

  if (hasProviderByEmail.length > 0) {
    return res.status(400).json({ error: 'Provider with this e-mail already exists' });
  }
  }

  if (tel) {
    const hasProviderByTel = await getProviderService.findByTel(tel);

  if (hasProviderByTel.length > 0) {
    return res.status(400).json({ error: 'Provider with this tel already exists' });
  }
  }

  const time = new Date().toISOString();

  const providerUpdated = await updateProviderService.update({
    id,
    data: {
      name,
      email,
      tel
    },
    time
  });

  if (!providerUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ provider: providerUpdated });
}
