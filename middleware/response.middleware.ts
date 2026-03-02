import type { Request, Response, NextFunction } from 'express';

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json;
  res.json = function (data: unknown) {
    if (!data || typeof data !== 'object') {
      return oldJson.apply(res, [data]);
    }
    return oldJson.apply(res, [data]);
  };
  next();
};