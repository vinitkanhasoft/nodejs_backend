import { CommonValidationRules, type ValidationRule } from '../../../utils';

export const registerSchema: Record<string, ValidationRule> = {
  email: {
    ...CommonValidationRules.email,
    field: 'email',
  },
  password: {
    ...CommonValidationRules.password,
    field: 'password',
  },
  role: {
    field: 'role',
    required: false,
    type: 'string',
    enum: ['user', 'admin', 'moderator'],
    message: 'Role must be one of: user, admin, moderator',
  },
};

export const loginSchema: Record<string, ValidationRule> = {
  email: {
    ...CommonValidationRules.email,
    field: 'email',
  },
  password: {
    field: 'password',
    required: true,
    type: 'string',
    minLength: 1,
    message: 'Password is required',
  },
};

export const refreshSchema: Record<string, ValidationRule> = {
  userId: {
    ...CommonValidationRules.uuid,
    field: 'userId',
    required: true,
    message: 'User ID is required',
  },
};