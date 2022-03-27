import { Request, Response, NextFunction } from 'express';
import { getUserService } from '../../modules/users/services/getUserService';

function can (role: string) {
  const roleAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const hasUser = await getUserService.findOne(userId);

    if (!hasUser) {
      return res.status(404).json({ error: 'Not found' });
    }

    const userPermissions = hasUser.permissions.split(",");

    if (!userPermissions.includes(role)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return next();
  }

  return roleAuthorized;
}

export { can };
