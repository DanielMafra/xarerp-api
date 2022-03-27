import { Request, Response } from 'express';
import { getSellerService } from '../services/getSellerService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const sellers = await getSellerService.listAll(String(q), Number(page));

    if (!sellers) {
      return res.status(404).json({ error: 'Not found' });
    }

    let newArray = [];
    let returnedSellers = [];
    returnedSellers.push(sellers[0]);

    for (let i = 0; i < sellers[1].length; i++) {
      newArray.push({
        id: sellers[1][i].id,
        user_id: sellers[1][i].user_id,
        user: sellers[1][i].user.name,
        comission: sellers[1][i].commission,
        comission_formatted: `${sellers[1][i].commission}%`,
        created_at: sellers[1][i].created_at,
        updated_at: sellers[1][i].updated_at,
      })
    }

    returnedSellers.push(newArray);

    return res.status(200).json({ sellers: returnedSellers });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const seller = await getSellerService.findOne(id);

    if (!seller) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ seller });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
