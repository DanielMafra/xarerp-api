import { Request, Response } from 'express';
import { getSellerService } from '../services/getSellerService';
import { updateSellerService } from '../services/updateSellerService';
import { getUserService } from '../../users/services/getUserService';

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { commission, user } = req.body;

    if (!commission && !user) {
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
        commission
      },
      time
    });

    if (!sellerUpdated) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ seller: sellerUpdated });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
