import { PipelineStage } from 'mongoose';

export const carAnalyticsPipeline = (): PipelineStage[] => [
  {
    $group: {
      _id: '$brand',
      averagePrice: { $avg: '$price' },
      totalCars: { $sum: 1 },
    },
  },
];