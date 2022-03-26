import { Request, Response } from 'express';
import { getClientService } from '../services/getClientService';

export const getAll = async (req: Request, res: Response) => {
  const { page, q } = req.query;

  const clients = await getClientService.listAll(String(q), Number(page));

  if (!clients) {
    return res.status(404).json({ error: 'Not found' });
  }

  let newArray = [];
  let returnedClients = [];
  returnedClients.push(clients[0]);

  for (let i = 0; i < clients[1].length; i++) {
    newArray.push({
      id: clients[1][i].id,
      name: clients[1][i].name,
      email: clients[1][i].email,
      tel: clients[1][i].tel,
      cep: clients[1][i].cep,
      city: clients[1][i].city,
      state: clients[1][i].state,
      user_id: clients[1][i].user_id,
      user: clients[1][i].user.name,
      unity_id: clients[1][i].unity_id,
      unity: clients[1][i].unity.name,
      created_at: clients[1][i].created_at,
      updated_at: clients[1][i].updated_at,
    })
  }

  returnedClients.push(newArray);

  return res.status(200).json({ clients: returnedClients });
}

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await getClientService.findOne(id);

  if (!client) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ client });
}
