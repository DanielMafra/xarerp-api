import { Request, Response } from 'express';
import { createUserService } from '../services/createUserService';
import { getUserService } from '../services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

export const create = async (req: Request, res: Response) => {
  const { name, email, unity, position, permissions } = req.body;
  const password = '1234';

  if (!name || !email || !unity || !position || !permissions) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const hasStore = await getStoreService.findOne(unity);

  if (!hasStore) {
    return res.status(404).json({ error: 'Store not found' });
  }

  const hasUserByEmail = await getUserService.findByEmail(email);

  if (hasUserByEmail.length > 0) {
    return res.status(400).json({ error: 'E-mail already exists' });
  }

  const newPermissions = permissions.split(',');
  newPermissions.push('view_dashboard');

  const hashPassword = await hash(password, 10);

  const user = await createUserService.create({
    id: uuidV4(),
    name,
    email,
    password: hashPassword,
    unity,
    position,
    permissions: newPermissions.join(','),
    active: true
  });

  if (!user) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(201).json({ user });
}
