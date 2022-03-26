import { Request, Response } from 'express';
import { getTicketService } from '../services/getTicketService';
import { getStoreService } from '../../stores/services/getStoreService';
import { getUserService } from '../../users/services/getUserService';
import { updateTicketService } from '../services/updateTicketService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, unity, user, status } = req.body;

  if (!title || !description || !unity || !user || !status) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const ticket = await getTicketService.findOne(id);

  if (!ticket) {
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

  const ticketUpdated = await updateTicketService.update(id, title, description, unity, user, status, time);

  if (!ticketUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ ticket: ticketUpdated });
}
