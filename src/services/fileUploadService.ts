import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

cloudinaryConfig.useFactory();

export const uploadFileToCloudinary = (
  file: Express.Multer.File,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      },
    );
    toStream(file.buffer).pipe(uploadStream);
  });
};
