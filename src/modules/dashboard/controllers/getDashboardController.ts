import { Request, Response } from 'express';
import { getUserService } from '../../users/services/getUserService';

export const getData = async (req: Request, res: Response) => {
  try {
    const id = req.userId;
    const user = await getUserService.findOne(id);

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    switch (user.position) {
      case 'Administração':
        break;
      case 'Financeiro':
        break;
      case 'Vendas':
        break;
      case 'Depósito':
        break;
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
