import { Request, Response } from 'express';
import { getUserService } from '../../users/services/getUserService';
import { createDashboard } from '../../../helpers/createDashboard';

export const getData = async (req: Request, res: Response) => {
  try {
    const id = req.userId;
    const user = await getUserService.findOne(id);

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    const result = await createDashboard(user.position);

    return res.status(200).json({ result });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
