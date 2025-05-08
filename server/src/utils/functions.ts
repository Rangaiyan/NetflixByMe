import { BadRequestException, PayloadTooLargeException, UnsupportedMediaTypeException } from "@nestjs/common";
import { ALLOWED_MIME_TYPES, CLOUDINARY_FILE_SIZE } from "./constants";

export function validateImage(image: Express.Multer.File) {
    if (!image) throw new BadRequestException('Image is required');
    if (image.size > CLOUDINARY_FILE_SIZE)
      throw new PayloadTooLargeException('Image size exceeds 5MB limit');
    if (!ALLOWED_MIME_TYPES.includes(image.mimetype))
      throw new UnsupportedMediaTypeException('Invalid image type');
  }