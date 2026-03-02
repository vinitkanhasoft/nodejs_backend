// config/constants.ts

// ------------------- User Roles -------------------
export const UserRole = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  SUPER_ADMIN: 'super_admin',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ------------------- User Status -------------------
export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  DELETED: 'deleted',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

// ------------------- Email Status -------------------
export const EmailStatus = {
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  PENDING: 'pending',
} as const;
export type EmailStatus = (typeof EmailStatus)[keyof typeof EmailStatus];

// ------------------- Account Type -------------------
export const AccountType = {
  PERSONAL: 'personal',
  BUSINESS: 'business',
  PREMIUM: 'premium',
} as const;
export type AccountType = (typeof AccountType)[keyof typeof AccountType];

// ------------------- Log Level -------------------
export const LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const;
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

// ------------------- HTTP Methods -------------------
export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
} as const;
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

// ------------------- HTTP Status -------------------
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

// ------------------- Response Status -------------------
export const ResponseStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;
export type ResponseStatus = (typeof ResponseStatus)[keyof typeof ResponseStatus];

// ------------------- File Types -------------------
export const FileType = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  ARCHIVE: 'archive',
  OTHER: 'other',
} as const;
export type FileType = (typeof FileType)[keyof typeof FileType];

// ------------------- Sort Order -------------------
export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

// ------------------- Notification Type -------------------
export const NotificationType = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

// ------------------- Notification Priority -------------------
export const NotificationPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;
export type NotificationPriority = (typeof NotificationPriority)[keyof typeof NotificationPriority];

// ------------------- Constants Object -------------------
export const Constants = {
  AUTH: {
    DEFAULT_USER_ROLE: UserRole.USER,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    PASSWORD_SALT_ROUNDS: 10,
    JWT_EXPIRATION: '1h',
    REFRESH_TOKEN_EXPIRATION: '7d',
    SESSION_TIMEOUT: 30 * 60 * 1000,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000,
  },
  PAGINATION: { DEFAULT_PAGE: 1, DEFAULT_LIMIT: 10, MAX_LIMIT: 100 },
  FILE: {
    MAX_FILE_SIZE: 10 * 1024 * 1024,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    UPLOAD_PATH: '/uploads',
  },
  RATE_LIMIT: { WINDOW_MS: 15 * 60 * 1000, MAX_REQUESTS: 100, STRICT_MAX_REQUESTS: 20 },
  CACHE: { DEFAULT_TTL: 5 * 60, USER_CACHE_TTL: 30 * 60, SESSION_CACHE_TTL: 60 * 60 },
  VALIDATION: {
    MAX_EMAIL_LENGTH: 254,
    MAX_USERNAME_LENGTH: 50,
    MIN_USERNAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_TITLE_LENGTH: 255,
    MAX_DESCRIPTION_LENGTH: 2000,
    MAX_COMMENT_LENGTH: 1000,
  },
  SECURITY: { BCRYPT_ROUNDS: 12, TOKEN_LENGTH: 32, API_KEY_LENGTH: 64, SESSION_SECRET_LENGTH: 64 },
  NOTIFICATION: { DEFAULT_RETRY_ATTEMPTS: 3, BATCH_SIZE: 100, RETRY_DELAY: 5000 },
  DATABASE: { CONNECTION_TIMEOUT: 10000, QUERY_TIMEOUT: 30000, MAX_CONNECTIONS: 10, MIN_CONNECTIONS: 2 },
  API: { VERSION: 'v1', BASE_PATH: '/api', REQUEST_TIMEOUT: 30000, MAX_RESPONSE_SIZE: 10 * 1024 * 1024 },
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
  ENVIRONMENTS: { DEVELOPMENT: 'development', PRODUCTION: 'production', TEST: 'test', STAGING: 'staging' },
} as const;

// ------------------- Helpers -------------------
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