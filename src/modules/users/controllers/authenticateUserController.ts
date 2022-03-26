import { Request, Response } from 'express';
import { compare } from "bcrypt";
import { sign } from 'jsonwebtoken';
import { getUserService } from '../services/getUserService';
import auth from '../../../config/auth';

export const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const hasUser = await getUserService.findByEmailLogin(email);

  if (!hasUser) {
    return res.status(400).json({ error: 'E-mail or password incorrect!' });
  }

  const passwordMatch = await compare(password, hasUser.password);

  if (!passwordMatch) {
    return res.status(400).json({ error: 'E-mail or password incorrect!' });
  }

  const { secret_token, expires_in_token } = auth;

  const token = sign({}, secret_token as string, {
    subject: hasUser.id,
    expiresIn: expires_in_token
  });

  const user = {
    name: hasUser.name,
    position: hasUser.position,
    active: hasUser.active,
    permissions: hasUser.permissions,
    unity: hasUser.unity.name
  }

  return res.status(200).json({ token, user });

}
