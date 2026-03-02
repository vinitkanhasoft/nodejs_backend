import { v2 as cloudinary } from 'cloudinary';
import { config } from '../../config/env.ts';

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.secret,
});

export class CloudinaryService {
  async upload(filePath: string, folder: string) {
    return cloudinary.uploader.upload(filePath, { folder });
  }

  async delete(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}