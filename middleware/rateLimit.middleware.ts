import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

export const rateLimitMiddleware = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  message: 'Too many requests, please try again later.',
});