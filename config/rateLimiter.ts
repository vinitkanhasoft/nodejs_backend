import rateLimit from 'express-rate-limit';
import { env } from './env';

export const apiRateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  message: 'Too many requests from this IP, please try again later.',
});