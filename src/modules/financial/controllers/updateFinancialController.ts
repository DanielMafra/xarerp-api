import { Request, Response } from 'express';
import { getFinancialService } from '../services/getFinancialService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getUserService } from '../../users/services/getUserService';
import { updateFinancialService } from '../services/updateFinancialService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, unity, user, value } = req.body;

  if ((type !== 0 && type !== 1) || !unity || !user || !value) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const financial = await getFinancialService.findOne(id);

  if (!financial) {
    return res.status(404).json({ error: 'Not found' });
  }

  const hasStore = await getStoreService.findOne(unity);

  if (!hasStore) {
    return res.status(404).json({ error: 'Store not found' });
  }

  const hasUser = await getUserService.findOne(user);

  if (!hasUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  const time = new Date().toISOString();

  const financialUpdated = await updateFinancialService.update(id, type, unity, user, value, time);

  if (!financialUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ financial: financialUpdated });
}
