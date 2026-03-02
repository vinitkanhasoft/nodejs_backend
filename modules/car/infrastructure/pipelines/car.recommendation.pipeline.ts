import type { PipelineStage } from 'mongoose';

export const carRecommendationPipeline = (brand: string): PipelineStage[] => [
  { $match: { brand } },
  { $sample: { size: 5 } },
];