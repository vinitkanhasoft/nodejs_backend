import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError.ts';
import { logger } from '../../config/logger.ts';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err.message || 'Internal Server Error');

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  res.status(500).json({ success: false, message: 'Internal Server Error' });
};
