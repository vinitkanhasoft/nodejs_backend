import Redis from 'ioredis';
import { config } from './env.ts';
import { logger } from './logger.ts';

export const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

redisClient.on('connect', () => logger.info('Redis connected'));
redisClient.on('error', (err) => logger.error('Redis error:', err));
