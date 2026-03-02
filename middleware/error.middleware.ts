import { Request, Response, NextFunction } from 'express';
import { formatErrorForResponse, isOperationalError, AppError } from '../utils';
import { logger } from '../config/logger';
import { config } from '../config';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error
  logger.error('Error occurred:', {
    error: err instanceof Error ? err.message : 'Unknown error',
    stack: err instanceof Error ? err.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Format error response using our utility
  const errorResponse = formatErrorForResponse(err as Error);

  // If it's an operational error, send the formatted response
  if (err instanceof AppError && isOperationalError(err as Error)) {
    return res.status(errorResponse.statusCode).json(errorResponse);
  }

  // For non-operational errors in production, send a generic message
  if (config.app.isProduction) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }

  // In development, send the full error response
  res.status(errorResponse.statusCode || 500).json(errorResponse);
};