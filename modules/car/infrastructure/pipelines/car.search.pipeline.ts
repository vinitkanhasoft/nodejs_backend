import { PipelineStage } from 'mongoose';

export const carSearchPipeline = (searchTerm: string): PipelineStage[] => [
  {
    $match: {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
      ],
    },
  },
];