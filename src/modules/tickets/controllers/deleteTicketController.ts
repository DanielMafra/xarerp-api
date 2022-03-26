import { Request, Response } from 'express';
import { getTicketService } from '../services/getTicketService';
import { deleteTicketService } from '../services/deleteTicketService';

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await getTicketService.findOne(id);

  if (!ticket) {
    return res.status(404).json({ error: 'Not found' });
  }

  await deleteTicketService.delete(id);

  return res.status(200).json({ status: true });
}
