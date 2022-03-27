import { Request, Response } from 'express';
import { getFinancialService } from '../services/getFinancialService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getUserService } from '../../users/services/getUserService';
import { updateFinancialService } from '../services/updateFinancialService';

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, unity, value } = req.body;

    if ((type !== 0 && type !== 1) && !unity && !value) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    if (type !== 0 && type !== 1) {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const financial = await getFinancialService.findOne(id);

    if (!financial) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (unity) {
      const hasStore = await getStoreService.findOne(unity);

      if (!hasStore) {
        return res.status(404).json({ error: 'Store not found' });
      }
    }

    const time = new Date().toISOString();

    const financialUpdated = await updateFinancialService.update({
      id,
      data: {
        type,
        unity_id: unity
      },
      time
    });

    if (!financialUpdated) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ financial: financialUpdated });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
