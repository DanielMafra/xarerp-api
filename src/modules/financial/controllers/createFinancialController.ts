import { Request, Response } from 'express';
import { getStoreService } from '../../stores/services/getStoreService';
import { getUserService } from '../../users/services/getUserService';
import { createFinancialService } from '../services/createFinancialService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  try {
    const { type, unity, value } = req.body;
    const user = req.userId;

    if ((type !== 0 && type !== 1) || !unity || !value) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const hasStore = await getStoreService.findOne(unity);

    if (!hasStore) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const hasUser = await getUserService.findOne(user);

    if (!hasUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const financial = await createFinancialService.create({
      id: uuidV4(),
      type,
      unity,
      user,
      value
    });

    if (!financial) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ financial });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
