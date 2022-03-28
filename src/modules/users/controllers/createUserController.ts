import { Request, Response } from 'express';
import { createUserService } from '../services/createUserService';
import { getUserService } from '../services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

export const create = async (req: Request, res: Response) => {
  try {
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

    const adminCanGets = ['get_stores', 'get_categories', 'get_providers', 'get_products', 'get_clients', 'get_sellers', 'get_carriers', 'get_users'];
    const finanCanGets = ['get_stores'];
    const saleCanGets = ['get_products', 'get_stores', 'get_clients', 'get_sellers', 'get_carriers'];
    const prodCanGets = ['get_categories', 'get_stores', 'get_providers'];

    const newPermissions = permissions.split(',');
    newPermissions.push('view_dashboard');

    switch (position) {
      case 'Administração':
        newPermissions.push(...adminCanGets);
        break;
      case 'Financeiro':
        newPermissions.push(...finanCanGets);
        break;
      case 'Vendas':
        newPermissions.push(...saleCanGets);
        break;
      case 'Depósito':
        newPermissions.push(...prodCanGets)
        break;
    }

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
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
