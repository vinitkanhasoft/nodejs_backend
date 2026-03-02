import Redis from 'ioredis';
import { env } from './env';
import { logger } from './logger';

export const redisClient = new Redis({
  host: env.redisHost,
  port: env.redisPort,
  password: env.redisPassword,
});

redisClient.on('connect', () => logger.info('Redis connected'));
redisClient.on('error', (err) => logger.error('Redis error:', err));
