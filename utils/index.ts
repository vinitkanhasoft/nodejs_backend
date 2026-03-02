// Export all utility functions and classes for easy importing
export * from './helpers';
export * from './crypto';
export * from './asyncHandler';
export * from './ApiResponse';
export * from './pagination';
export * from './errors';
export * from './validation';

// Re-export commonly used items
export { ApiResponse } from './ApiResponse';
export { asyncHandler } from './asyncHandler';
export { paginate, type PaginationOptions, type PaginationResult } from './pagination';
export { 
  AppError, 
  ValidationError, 
  NotFoundError, 
  UnauthorizedError, 
  ForbiddenError,
  ConflictError,
  DatabaseError,
  ExternalServiceError,
  RateLimitError,
  AuthenticationError,
  AuthorizationError,
  TokenError,
  FileUploadError,
  EmailError,
  CacheError,
  createError,
  isOperationalError,
  getErrorStatusCode,
  getErrorCode,
  getErrorDetails,
  formatErrorForResponse,
  handleAsyncError,
  throwIf,
  throwIfNull,
  throwIfEmpty,
  errorHandler
} from './errors';

export { 
  Validator, 
  type ValidationRule, 
  type ValidationResult,
  CommonValidationRules,
  validateEmail,
  validatePassword,
  validateUsername,
  validateUrl,
  validatePhone,
  validateUuid,
  validateSchema,
  sanitizeInput,
  validateBulk
} from './validation';

export { 
  generateRandomToken,
  generateUUID,
  hashString,
  hashPassword,
  comparePassword,
  generateApiKey,
  generateSessionToken,
  createHMAC,
  verifyHMAC,
  encryptData,
  decryptData,
  generateSecureRandom,
  createHashedId,
  generateTOTPSecret,
  verifyTOTP
} from './crypto';

export {
  capitalize,
  isEmpty,
  isNotEmpty,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isEmail,
  isUrl,
  isStrongPassword,
  sanitizeString,
  truncate,
  slugify,
  generateSlug,
  formatBytes,
  formatDate,
  isFutureDate,
  isPastDate,
  delay,
  retry,
  debounce,
  throttle,
  pick,
  omit,
  deepClone,
  generateId,
  maskEmail,
  maskPhone
} from './helpers';
