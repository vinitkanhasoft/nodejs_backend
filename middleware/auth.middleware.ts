import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { IRequest } from '../core/types/request.types';
import { logger } from '@/config/logger';

export const authMiddleware = (roles: string[] = []) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, env.jwtSecret) as { id: string; role: string };

      req.user = { id: decoded.id, role: decoded.role };

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      next();
    } catch (err) {
      logger.error('Authentication error:', err);
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
};
