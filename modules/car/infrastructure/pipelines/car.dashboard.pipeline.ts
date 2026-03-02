import { PipelineStage } from 'mongoose';

export const carDashboardPipeline = (): PipelineStage[] => [
  { $sort: { createdAt: -1 } },
  { $limit: 10 },
];