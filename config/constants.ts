export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SUPER_ADMIN = 'super_admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  DELETED = 'deleted',
}

export enum EmailStatus {
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
}

export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
  PREMIUM = 'premium',
}

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  ARCHIVE = 'archive',
  OTHER = 'other',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export const Constants = {
  AUTH: {
    DEFAULT_USER_ROLE: UserRole.USER,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    PASSWORD_SALT_ROUNDS: 10,
    JWT_EXPIRATION: '1h',
    REFRESH_TOKEN_EXPIRATION: '7d',
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  },

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  FILE: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    UPLOAD_PATH: '/uploads',
  },

  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
    STRICT_MAX_REQUESTS: 20, // For sensitive endpoints
  },

  CACHE: {
    DEFAULT_TTL: 5 * 60, // 5 minutes
    USER_CACHE_TTL: 30 * 60, // 30 minutes
    SESSION_CACHE_TTL: 60 * 60, // 1 hour
  },

  VALIDATION: {
    MAX_EMAIL_LENGTH: 254,
    MAX_USERNAME_LENGTH: 50,
    MIN_USERNAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_TITLE_LENGTH: 255,
    MAX_DESCRIPTION_LENGTH: 2000,
    MAX_COMMENT_LENGTH: 1000,
  },

  SECURITY: {
    BCRYPT_ROUNDS: 12,
    TOKEN_LENGTH: 32,
    API_KEY_LENGTH: 64,
    SESSION_SECRET_LENGTH: 64,
  },

  NOTIFICATION: {
    DEFAULT_RETRY_ATTEMPTS: 3,
    BATCH_SIZE: 100,
    RETRY_DELAY: 5000, // 5 seconds
  },

  DATABASE: {
    CONNECTION_TIMEOUT: 10000,
    QUERY_TIMEOUT: 30000,
    MAX_CONNECTIONS: 10,
    MIN_CONNECTIONS: 2,
  },

  API: {
    VERSION: 'v1',
    BASE_PATH: '/api',
    REQUEST_TIMEOUT: 30000,
    MAX_RESPONSE_SIZE: 10 * 1024 * 1024, // 10MB
  },

  REGEX: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    USERNAME: /^[a-zA-Z0-9_]{3,50}$/,
    PHONE: /^\+?[\d\s-()]{10,}$/,
    URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    SLUG: /^[a-z0-9-]+$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  },

  MESSAGES: {
    SUCCESS: {
      CREATED: 'Resource created successfully',
      UPDATED: 'Resource updated successfully',
      DELETED: 'Resource deleted successfully',
      RETRIEVED: 'Resource retrieved successfully',
    },
    ERROR: {
      NOT_FOUND: 'Resource not found',
      UNAUTHORIZED: 'Unauthorized access',
      FORBIDDEN: 'Access forbidden',
      VALIDATION: 'Validation failed',
      SERVER_ERROR: 'Internal server error',
      DUPLICATE: 'Resource already exists',
    },
    AUTH: {
      LOGIN_SUCCESS: 'Login successful',
      LOGOUT_SUCCESS: 'Logout successful',
      PASSWORD_CHANGED: 'Password changed successfully',
      EMAIL_VERIFIED: 'Email verified successfully',
      ACCOUNT_CREATED: 'Account created successfully',
    },
  },

  ENVIRONMENTS: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
    STAGING: 'staging',
  },
} as const;

export type UserRoleType = keyof typeof UserRole;
export type UserStatusType = keyof typeof UserStatus;
export type HttpMethodType = keyof typeof HttpMethod;
export type HttpStatusType = keyof typeof HttpStatus;

export const isValidUserRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};

export const isValidUserStatus = (status: string): status is UserStatus => {
  return Object.values(UserStatus).includes(status as UserStatus);
};

export const isValidHttpMethod = (method: string): method is HttpMethod => {
  return Object.values(HttpMethod).includes(method as HttpMethod);
};

export const getSuccessMessage = (action: keyof typeof Constants.MESSAGES.SUCCESS): string => {
  return Constants.MESSAGES.SUCCESS[action];
};

export const getErrorMessage = (error: keyof typeof Constants.MESSAGES.ERROR): string => {
  return Constants.MESSAGES.ERROR[error];
};
