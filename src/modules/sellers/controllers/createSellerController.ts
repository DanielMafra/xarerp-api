import { Request, Response } from 'express';
import { createSellerService } from '../services/createSellerService';
import { getUserService } from '../../users/services/getUserService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  try {
    const { user, commission } = req.body;

    if (!user || !commission) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const hasUser = await getUserService.findOne(user);

    if (!hasUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const seller = await createSellerService.create({
      id: uuidV4(),
      commission,
      user
    });

    if (!seller) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ seller });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
