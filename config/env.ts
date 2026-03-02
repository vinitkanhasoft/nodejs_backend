// config/env.ts
import dotenv from 'dotenv';

// Load .env file at the very start
dotenv.config();

// ---------------------
// CONFIG INTERFACES
// ---------------------
interface DatabaseConfig {
  uri: string;
  options?: {
    maxPoolSize?: number;
    serverSelectionTimeoutMS?: number;
    socketTimeoutMS?: number;
  };
}

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

interface JWTConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  secure?: boolean;
}

interface CloudinaryConfig {
  name: string;
  key: string;
  secret: string;
}

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

interface AppConfig {
  port: number;
  nodeEnv: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

// ---------------------
// ENV VALIDATION
// ---------------------
export const validateEnv = (): void => {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

validateEnv();

// ---------------------
// APP CONFIG
// ---------------------
export const appConfig: AppConfig = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  get isDevelopment() {
    return this.nodeEnv === 'development';
  },
  get isProduction() {
    return this.nodeEnv === 'production';
  },
  get isTest() {
    return this.nodeEnv === 'test';
  },
};

// ---------------------
// DATABASE CONFIG
// ---------------------
export const databaseConfig: DatabaseConfig = {
  uri: process.env.MONGO_URI ?? '',
  options: {
    maxPoolSize: Number(process.env.DB_MAX_POOL_SIZE ?? 10),
    serverSelectionTimeoutMS: Number(process.env.DB_SERVER_SELECTION_TIMEOUT ?? 5000),
    socketTimeoutMS: Number(process.env.DB_SOCKET_TIMEOUT ?? 45000),
  },
};

// ---------------------
// REDIS CONFIG
// ---------------------
export const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST ?? 'localhost',
  port: Number(process.env.REDIS_PORT ?? 6379),
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB ?? 0),
};

// ---------------------
// JWT CONFIG
// ---------------------
export const jwtConfig: JWTConfig = {
  secret: process.env.JWT_SECRET ?? 'defaultsecret',
  expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
};

// ---------------------
// MAIL CONFIG
// ---------------------
export const mailConfig: MailConfig = {
  host: process.env.MAIL_HOST ?? 'smtp.example.com',
  port: Number(process.env.MAIL_PORT ?? 587),
  user: process.env.MAIL_USER ?? 'user@example.com',
  pass: process.env.MAIL_PASS ?? 'password',
  from: process.env.MAIL_FROM ?? 'no-reply@example.com',
  secure: process.env.MAIL_SECURE === 'true',
};

// ---------------------
// CLOUDINARY CONFIG
// ---------------------
export const cloudinaryConfig: CloudinaryConfig = {
  name: process.env.CLOUDINARY_NAME ?? '',
  key: process.env.CLOUDINARY_KEY ?? '',
  secret: process.env.CLOUDINARY_SECRET ?? '',
};

// ---------------------
// RATE LIMIT CONFIG
// ---------------------
export const rateLimitConfig: RateLimitConfig = {
  windowMs: Number(process.env.RATE_LIMIT_WINDOW ?? 15 * 60 * 1000),
  max: Number(process.env.RATE_LIMIT_MAX ?? 100),
};

// ---------------------
// COMBINED CONFIG OBJECT
// ---------------------
export const config = {
  app: appConfig,
  database: databaseConfig,
  redis: redisConfig,
  jwt: jwtConfig,
  mail: mailConfig,
  cloudinary: cloudinaryConfig,
  rateLimit: rateLimitConfig,
} as const;

export type Config = typeof config;