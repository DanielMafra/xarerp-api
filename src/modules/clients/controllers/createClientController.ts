import { Request, Response } from 'express';
import { getClientService } from '../services/getClientService';
import { getUserService } from '../../users/services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { createClientService } from '../services/createClientService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  const { name, email, tel, cep, city, state, unity } = req.body;
  const user = req.userId;

  if (!name || !email || !tel || !cep || !city || !state || !unity) {
    return res.status(400).json({ error: 'Incomplete data' });
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

  const client = await createClientService.create({
    id: uuidV4(),
    name,
    email,
    tel,
    cep,
    city,
    state,
    user,
    unity
  });

  if (!client) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(201).json({ client });
}
