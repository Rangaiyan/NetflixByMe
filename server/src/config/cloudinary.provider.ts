import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    const cloudinaryConfig = {
      cloud_name: configService.get('cloudinary.cloud_name'),
      api_key: configService.get('cloudinary.api_key'),
      api_secret: configService.get('cloudinary.api_secret'),
    };

    if (
      !cloudinaryConfig.cloud_name ||
      !cloudinaryConfig.api_key ||
      !cloudinaryConfig.api_secret
    ) {
      throw new Error('Cloudinary configuration is missing');
    }

    cloudinary.config(cloudinaryConfig);

    return cloudinary;
  },
  inject: [ConfigService],
};
