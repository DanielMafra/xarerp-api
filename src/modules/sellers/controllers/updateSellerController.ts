import { Request, Response } from 'express';
import { getSellerService } from '../services/getSellerService';
import { updateSellerService } from '../services/updateSellerService';
import { getUserService } from '../../users/services/getUserService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comission, user } = req.body;

  if (!comission && !user) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const seller = await getSellerService.findOne(id);

  if (!seller) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (user) {
    const hasUser = await getUserService.findOne(user);

  if (!hasUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  }

  const time = new Date().toISOString();

  const sellerUpdated = await updateSellerService.update({
    id,
    data: {
      user_id: user,
      comission
    },
    time
  });

  if (!sellerUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ seller: sellerUpdated });
}
