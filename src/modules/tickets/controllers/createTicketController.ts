import { Request, Response } from 'express';
import { getStoreService } from '../../stores/services/getStoreService';
import { getUserService } from '../../users/services/getUserService';
import { createTicketService } from '../services/createTicketService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  try {
    const { title, description, unity } = req.body;
    const user = req.userId;

    if (!title || !description || !unity) {
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

    const ticket = await createTicketService.create({
      id: uuidV4(),
      title,
      description,
      unity,
      user,
      status: 0
    });

    if (!ticket) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ ticket });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
