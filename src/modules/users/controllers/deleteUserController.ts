import { Request, Response } from 'express';
import { deleteUserService } from '../services/deleteUserService';
import { getUserService } from '../services/getUserService';

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserService.findOne(id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  await deleteUserService.delete(id);

  return res.status(200).json({ status: true });
}
