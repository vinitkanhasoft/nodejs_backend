import { CommonValidationRules, type ValidationRule } from '../../../utils';

export const createCarSchema: Record<string, ValidationRule> = {
  name: {
    field: 'name',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 100,
    message: 'Car name is required and must be 1-100 characters',
  },
  brand: {
    field: 'brand',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 50,
    message: 'Brand is required and must be 1-50 characters',
  },
  model: {
    field: 'model',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 50,
    message: 'Model is required and must be 1-50 characters',
  },
  year: {
    field: 'year',
    required: true,
    type: 'number',
    min: 1900,
    max: new Date().getFullYear() + 1,
    message: `Year must be between 1900 and ${new Date().getFullYear() + 1}`,
  },
  price: {
    field: 'price',
    required: true,
    type: 'number',
    min: 0,
    message: 'Price is required and must be a positive number',
  },
  mileage: {
    field: 'mileage',
    required: false,
    type: 'number',
    min: 0,
    message: 'Mileage must be a positive number',
  },
};

export const updateCarSchema: Record<string, ValidationRule> = {
  name: {
    field: 'name',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 100,
    message: 'Car name must be 1-100 characters',
  },
  brand: {
    field: 'brand',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 50,
    message: 'Brand must be 1-50 characters',
  },
  model: {
    field: 'model',
    required: false,
    type: 'string',
    minLength: 1,
    maxLength: 50,
    message: 'Model must be 1-50 characters',
  },
  year: {
    field: 'year',
    required: false,
    type: 'number',
    min: 1900,
    max: new Date().getFullYear() + 1,
    message: `Year must be between 1900 and ${new Date().getFullYear() + 1}`,
  },
  price: {
    field: 'price',
    required: false,
    type: 'number',
    min: 0,
    message: 'Price must be a positive number',
  },
  mileage: {
    field: 'mileage',
    required: false,
    type: 'number',
    min: 0,
    message: 'Mileage must be a positive number',
  },
};

export const searchCarSchema: Record<string, ValidationRule> = {
  search: {
    field: 'search',
    required: false,
    type: 'string',
    maxLength: 200,
    message: 'Search term must not exceed 200 characters',
  },
  brand: {
    field: 'brand',
    required: false,
    type: 'string',
    maxLength: 50,
    message: 'Brand filter must not exceed 50 characters',
  },
  minPrice: {
    field: 'minPrice',
    required: false,
    type: 'number',
    min: 0,
    message: 'Minimum price must be a positive number',
  },
  maxPrice: {
    field: 'maxPrice',
    required: false,
    type: 'number',
    min: 0,
    message: 'Maximum price must be a positive number',
  },
  page: {
    ...CommonValidationRules.pagination.page,
    field: 'page',
  },
  limit: {
    ...CommonValidationRules.pagination.limit,
    field: 'limit',
  },
  sortBy: {
    field: 'sortBy',
    required: false,
    type: 'string',
    enum: ['name', 'brand', 'model', 'year', 'price', 'mileage'],
    message: 'Sort by must be one of: name, brand, model, year, price, mileage',
  },
  sortOrder: {
    ...CommonValidationRules.sortOrder,
    field: 'sortOrder',
  },
};