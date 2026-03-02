import { z } from 'zod';

export const createCarSchema = z.object({
  body: z.object({
    name: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    price: z.number(),
    mileage: z.number().optional(),
  }),
});

export const updateCarSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.number().optional(),
    price: z.number().optional(),
    mileage: z.number().optional(),
  }),
});

export const searchCarSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    brand: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
  }),
});