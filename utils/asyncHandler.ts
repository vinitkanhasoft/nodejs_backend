import { Request, Response, NextFunction, RequestHandler } from 'express';

// Wrap an async Express handler to catch errors
export const asyncHandler = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};