import { Request, Response } from 'express';
import { ApiError } from '../core/errors/ApiError';
import { logger } from '../config/logger';

export const errorMiddleware = (err: unknown, req: Request, res: Response) => {
  logger.error(err instanceof Error ? err.message : 'Internal Server Error');

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  res.status(500).json({ success: false, message: 'Internal Server Error' });
};