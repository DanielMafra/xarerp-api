import { Request, Response } from 'express';
import { getClientService } from '../services/getClientService';
import { getUserService } from '../../users/services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { updateClientService } from '../services/updateClientService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, tel, cep, city, state, unity, user } = req.body;

  if (!name || !email || !tel || !cep || !city || !state || !unity || !user) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const client = await getClientService.findOne(id);

  if (!client) {
    return res.status(404).json({ error: 'Not found' });
  }

  const hasClientByEmail = await getClientService.findByEmail(email);

  if (hasClientByEmail.length > 0) {
    return res.status(400).json({ error: 'Client with this e-mail already exists' });
  }

  const hasClientByTel = await getClientService.findByTel(tel);

  if (hasClientByTel.length > 0) {
    return res.status(400).json({ error: 'Provider with this tel already exists' });
  }

  const hasUser = await getUserService.findOne(user);

  if (!hasUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  const hasStore = await getStoreService.findOne(unity);

  if (!hasStore) {
    return res.status(404).json({ error: 'Store not found' });
  }

  const time = new Date().toISOString();

  const clientUpdated = await updateClientService.update(id, name, email, tel, cep, city, state, unity, user, time);

  if (!clientUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ client: clientUpdated });
}
