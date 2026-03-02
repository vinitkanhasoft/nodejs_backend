import { Request, Response, NextFunction } from 'express';

// Module augmentation instead of namespace
declare module 'express-serve-static-core' {
  interface Request {
    startTime?: number;
  }
}

export const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  req.startTime = Date.now();
  next();
};