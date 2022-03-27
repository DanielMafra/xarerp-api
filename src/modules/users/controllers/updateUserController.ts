import { Request, Response } from 'express';
import { updateUserService } from '../services/updateUserService';
import { getUserService } from '../services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, position, permissions, active, unity } = req.body;

  if (!name && !email && !password && !position && !permissions && (active !== false && active !== true) && !unity) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const user = await getUserService.findOne(id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (unity) {
    const hasStore = await getStoreService.findOne(unity);

  if (!hasStore) {
    return res.status(404).json({ error: 'Store not found' });
  }
  }

  if (email && (email !== user.email)) {
    const hasUserByEmail = await getUserService.findByEmail(email);

  if (hasUserByEmail.length > 0) {
    return res.status(400).json({ error: 'E-mail already exists' });
  }
  }

  const time = new Date().toISOString();
  const hashPassword = await hash(password, 10);

  const userUpdated = await updateUserService.update({
    id,
    data: {
      name,
      email,
      password: hashPassword,
      unity_id: unity,
      position,
      permissions,
      active
    },
    time
  });

  if (!userUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ user: userUpdated });
}
