import { Request, Response } from 'express';
import { getUserService } from '../services/getUserService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const users = await getUserService.listAll(String(q), Number(page));

    if (!users) {
      return res.status(404).json({ error: 'Not found' });
    }

    let newArray = [];
    let returnedUsers = [];
    returnedUsers.push(users[0]);

    for (let i = 0; i < users[1].length; i++) {
      newArray.push({
        id: users[1][i].id,
        name: users[1][i].name,
        email: users[1][i].email,
        unity_id: users[1][i].unity_id,
        unity: users[1][i].unity.name,
        position: users[1][i].position,
        permissions: users[1][i].permissions,
        active: users[1][i].active,
        created_at: users[1][i].created_at,
        updated_at: users[1][i].updated_at,
      })
    }

    returnedUsers.push(newArray);

    return res.status(200).json({ users: returnedUsers });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserService.findOne(id);

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
