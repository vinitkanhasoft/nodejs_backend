import { Request, Response, NextFunction } from 'express';
import { CacheService } from './cache.service.ts';

const cache = new CacheService();

export const cacheMiddleware = (key: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cached = cache.get(key);
    if (cached) return res.json({ success: true, data: cached });

    // Save original json method
    const originalJson = res.json.bind(res);

    res.json = (body: unknown): Response => {
      cache.set(key, body);
      return originalJson(body);
    };

    next();
  };
};