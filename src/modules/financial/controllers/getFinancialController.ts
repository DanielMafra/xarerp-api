import { Request, Response } from 'express';
import { getFinancialService } from '../services/getFinancialService';

export const getAll = async (req: Request, res: Response) => {
  const { page, q } = req.query;

  const financial = await getFinancialService.listAll(String(q), Number(page));

  if (!financial) {
    return res.status(404).json({ error: 'Not found' });
  }

  let newArray = [];
  let returnedFinancial = [];
  returnedFinancial.push(financial[0]);

  for (let i = 0; i < financial[1].length; i++) {
    newArray.push({
      id: financial[1][i].id,
      type: financial[1][i].type === 1 ? 'Entrada' : 'Saída',
      unity_id: financial[1][i].unity_id,
      unity: financial[1][i].unity.name,
      user_id: financial[1][i].user_id,
      user: financial[1][i].user.name,
      value: financial[1][i].value,
      value_formatted: `${financial[1][i].value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`,
      created_at: financial[1][i].created_at,
      updated_at: financial[1][i].updated_at,
    })
  }

  returnedFinancial.push(newArray);

  return res.status(200).json({ financial: returnedFinancial });
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const financial = await getFinancialService.findOne(id);

  if (!financial) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ financial });
}
