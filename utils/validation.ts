import { Constants } from '../config/constants';
import { ValidationError } from './errors';
import { isString, isNumber, isBoolean, isObject, isArray, isEmail, isUrl } from './helpers';

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
  enum?: any[];
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class Validator {
  private rules: ValidationRule[] = [];
  private data: any = {};

  public addRule(rule: ValidationRule): Validator {
    this.rules.push(rule);
    return this;
  }

  public addRules(rules: ValidationRule[]): Validator {
    this.rules.push(...rules);
    return this;
  }

  public setData(data: any): Validator {
    this.data = data;
    return this;
  }

  public validate(): ValidationResult {
    const errors: ValidationError[] = [];

    for (const rule of this.rules) {
      const value = this.data[rule.field];
      const fieldErrors = this.validateField(rule, value);
      errors.push(...fieldErrors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private validateField(rule: ValidationRule, value: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check if required
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(new ValidationError(
        rule.message || `${rule.field} is required`,
        [{ field: rule.field, message: 'Field is required' }]
      ));
      return errors;
    }

    // Skip validation if field is not required and value is empty
    if (!rule.required && (value === undefined || value === null || value === '')) {
      return errors;
    }

    // Type validation
    if (rule.type) {
      const typeError = this.validateType(rule.field, value, rule.type);
      if (typeError) errors.push(typeError);
    }

    // String validations
    if (isString(value)) {
      if (rule.minLength !== undefined && value.length < rule.minLength) {
        errors.push(new ValidationError(
          rule.message || `${rule.field} must be at least ${rule.minLength} characters long`,
          [{ field: rule.field, message: `Minimum length is ${rule.minLength}` }]
        ));
      }

      if (rule.maxLength !== undefined && value.length > rule.maxLength) {
        errors.push(new ValidationError(
          rule.message || `${rule.field} must not exceed ${rule.maxLength} characters`,
          [{ field: rule.field, message: `Maximum length is ${rule.maxLength}` }]
        ));
      }
    }

    // Number validations
    if (isNumber(value)) {
      if (rule.min !== undefined && value < rule.min) {
        errors.push(new ValidationError(
          rule.message || `${rule.field} must be at least ${rule.min}`,
          [{ field: rule.field, message: `Minimum value is ${rule.min}` }]
        ));
      }

      if (rule.max !== undefined && value > rule.max) {
        errors.push(new ValidationError(
          rule.message || `${rule.field} must not exceed ${rule.max}`,
          [{ field: rule.field, message: `Maximum value is ${rule.max}` }]
        ));
      }
    }

    // Pattern validation
    if (rule.pattern && isString(value) && !rule.pattern.test(value)) {
      errors.push(new ValidationError(
        rule.message || `${rule.field} format is invalid`,
        [{ field: rule.field, message: 'Invalid format' }]
      ));
    }

    // Enum validation
    if (rule.enum && !rule.enum.includes(value)) {
      errors.push(new ValidationError(
        rule.message || `${rule.field} must be one of: ${rule.enum.join(', ')}`,
        [{ field: rule.field, message: `Invalid value. Must be one of: ${rule.enum.join(', ')}` }]
      ));
    }

    // Custom validation
    if (rule.custom) {
      const customResult = rule.custom(value);
      if (customResult !== true) {
        const message = typeof customResult === 'string' ? customResult : 
          rule.message || `${rule.field} is invalid`;
        errors.push(new ValidationError(message, [
          { field: rule.field, message: 'Custom validation failed' }
        ]));
      }
    }

    return errors;
  }

  private validateType(field: string, value: any, expectedType: string): ValidationError | null {
    let isValid = false;

    switch (expectedType) {
      case 'string':
        isValid = isString(value);
        break;
      case 'number':
        isValid = isNumber(value);
        break;
      case 'boolean':
        isValid = isBoolean(value);
        break;
      case 'object':
        isValid = isObject(value);
        break;
      case 'array':
        isValid = isArray(value);
        break;
    }

    if (!isValid) {
      return new ValidationError(
        `${field} must be of type ${expectedType}`,
        [{ field, message: `Expected type ${expectedType}` }]
      );
    }

    return null;
  }
}

// Predefined validation rules
export const CommonValidationRules = {
  email: {
    field: 'email',
    required: true,
    type: 'string' as const,
    maxLength: Constants.VALIDATION.MAX_EMAIL_LENGTH,
    custom: (value: string) => isEmail(value) || 'Invalid email format',
  },

  password: {
    field: 'password',
    required: true,
    type: 'string' as const,
    minLength: Constants.AUTH.PASSWORD_MIN_LENGTH,
    maxLength: Constants.AUTH.PASSWORD_MAX_LENGTH,
    pattern: Constants.REGEX.PASSWORD,
    message: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character',
  },

  username: {
    field: 'username',
    required: true,
    type: 'string' as const,
    minLength: Constants.VALIDATION.MIN_USERNAME_LENGTH,
    maxLength: Constants.VALIDATION.MAX_USERNAME_LENGTH,
    pattern: Constants.REGEX.USERNAME,
    message: 'Username must be 3-50 characters long and contain only letters, numbers, and underscores',
  },

  name: {
    field: 'name',
    required: true,
    type: 'string' as const,
    maxLength: Constants.VALIDATION.MAX_NAME_LENGTH,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must contain only letters and spaces',
  },

  title: {
    field: 'title',
    required: true,
    type: 'string' as const,
    maxLength: Constants.VALIDATION.MAX_TITLE_LENGTH,
  },

  description: {
    field: 'description',
    required: false,
    type: 'string' as const,
    maxLength: Constants.VALIDATION.MAX_DESCRIPTION_LENGTH,
  },

  url: {
    field: 'url',
    required: false,
    type: 'string' as const,
    custom: (value: string) => !value || isUrl(value) || 'Invalid URL format',
  },

  phone: {
    field: 'phone',
    required: false,
    type: 'string' as const,
    pattern: Constants.REGEX.PHONE,
    message: 'Invalid phone number format',
  },

  uuid: {
    field: 'id',
    required: true,
    type: 'string' as const,
    pattern: Constants.REGEX.UUID,
    message: 'Invalid UUID format',
  },

  pagination: {
    page: {
      field: 'page',
      required: false,
      type: 'number' as const,
      min: 1,
      max: Constants.PAGINATION.MAX_LIMIT,
    },
    limit: {
      field: 'limit',
      required: false,
      type: 'number' as const,
      min: 1,
      max: Constants.PAGINATION.MAX_LIMIT,
    },
  },

  sortOrder: {
    field: 'sortOrder',
    required: false,
    type: 'string' as const,
    enum: ['asc', 'desc'],
  },
};

// Quick validation functions
export const validateEmail = (email: string): boolean => {
  return isEmail(email);
};

export const validatePassword = (password: string): boolean => {
  return Constants.REGEX.PASSWORD.test(password);
};

export const validateUsername = (username: string): boolean => {
  return Constants.REGEX.USERNAME.test(username);
};

export const validateUrl = (url: string): boolean => {
  return isUrl(url);
};

export const validatePhone = (phone: string): boolean => {
  return Constants.REGEX.PHONE.test(phone);
};

export const validateUuid = (uuid: string): boolean => {
  return Constants.REGEX.UUID.test(uuid);
};

// Schema validation
export const validateSchema = (data: any, schema: Record<string, ValidationRule>): ValidationResult => {
  const validator = new Validator();
  const rules = Object.values(schema);
  
  return validator.setData(data).addRules(rules).validate();
};

// Sanitization functions
export const sanitizeInput = (input: any): any => {
  if (isString(input)) {
    return input.trim().replace(/[<>]/g, '');
  }
  
  if (isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (isObject(input)) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  
  return input;
};

// Bulk validation
export const validateBulk = (dataArray: any[], schema: Record<string, ValidationRule>): ValidationResult => {
  const allErrors: ValidationError[] = [];
  
  dataArray.forEach((data, index) => {
    const result = validateSchema(data, schema);
    if (!result.isValid) {
      result.errors.forEach(error => {
        error.message = `Row ${index + 1}: ${error.message}`;
        allErrors.push(error);
      });
    }
  });
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};
