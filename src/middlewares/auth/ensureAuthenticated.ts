import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { getUserService } from '../../modules/users/services/getUserService';

export const ensureAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    const [, token] = authHeaders.split(" ");

    try {
      verify(token, process.env.SECRET_JWT as string);

      const { sub }: any = decode(token);
      req.userId = sub.toString();

      return next();
    } catch (err) {
      return res.status(401).json({ isValid: false }).end();
    }
  }
}

export const validateToken = async (req: Request, res: Response) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  const [, token] = authHeaders.split(" ");

  try {
    verify(token, process.env.SECRET_JWT as string);

    const { sub }: any = decode(token);
    const user = await getUserService.findOne(sub);

    if (!user) {
      return res.status(500).json({ error: 'Internal server error' }).end();
    }

    return res.status(200).json({ user }).end();
  } catch (err) {
    return res.status(401).json({ isValid: false }).end();
  }
}
