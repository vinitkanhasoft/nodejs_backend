import { v2 as cloudinary } from 'cloudinary';
import { env } from '../../config/env';

cloudinary.config({
  cloud_name: env.cloudinaryName,
  api_key: env.cloudinaryKey,
  api_secret: env.cloudinarySecret,
});

export class CloudinaryService {
  async upload(filePath: string, folder: string) {
    return cloudinary.uploader.upload(filePath, { folder });
  }

  async delete(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}