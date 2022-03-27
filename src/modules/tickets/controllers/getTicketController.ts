import { Request, Response } from 'express';
import { getTicketService } from '../services/getTicketService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const tickets = await getTicketService.listAll(String(q), Number(page));

    if (!tickets) {
      return res.status(404).json({ error: 'Not found' });
    }

    let newArray = [];
    let returnedTickets = [];
    returnedTickets.push(tickets[0]);

    for (let i = 0; i < tickets[1].length; i++) {
      newArray.push({
        id: tickets[1][i].id,
        title: tickets[1][i].title,
        description: tickets[1][i].description,
        unity_id: tickets[1][i].unity_id,
        unity: tickets[1][i].unity.name,
        user_id: tickets[1][i].user_id,
        user: tickets[1][i].user.name,
        status: tickets[1][i].status === 0 ? 'Pendente' : tickets[1][i].status === 1 ? 'Em andamento' : 'Resolvido',
        created_at: tickets[1][i].created_at,
        updated_at: tickets[1][i].updated_at,
      })
    }

    returnedTickets.push(newArray);

    return res.status(200).json({ tickets: returnedTickets });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await getTicketService.findOne(id);

    if (!ticket) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ ticket });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
