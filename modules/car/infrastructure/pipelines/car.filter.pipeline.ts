import type { PipelineStage } from 'mongoose';

type CarFilters = {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};

// Define a type-safe match object for Car
type CarMatch = {
  brand?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
};

export const carFilterPipeline = (filters?: CarFilters): PipelineStage[] => {
  const match: CarMatch = {};

  if (filters) {
    if (filters.brand) match.brand = filters.brand;

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      match.price = {};
      if (filters.minPrice !== undefined) match.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) match.price.$lte = filters.maxPrice;
    }
  }

  return [{ $match: match }];
};