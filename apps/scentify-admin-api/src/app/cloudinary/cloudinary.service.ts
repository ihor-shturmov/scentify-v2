import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinaryProvider } from './cloudinary.provider';

@Injectable()
export class CloudinaryService {
    constructor(private cloudinaryProvider: CloudinaryProvider) { }

    async uploadImage(
        file: Express.Multer.File,
        folder: string = 'perfumes'
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const cloudinary = this.cloudinaryProvider.getCloudinary();

        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder,
                        resource_type: 'image',
                        transformation: [
                            { width: 1000, height: 1000, crop: 'limit' },
                            { quality: 'auto:good' },
                            { fetch_format: 'auto' },
                        ],
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result!);
                    }
                )
                .end(file.buffer);
        });
    }

    async uploadMultipleImages(
        files: Express.Multer.File[],
        folder: string = 'perfumes'
    ): Promise<string[]> {
        const uploadPromises = files.map((file) => this.uploadImage(file, folder));
        const results = await Promise.all(uploadPromises);
        return results.map((result) => result.secure_url);
    }

    async deleteImage(publicId: string): Promise<any> {
        const cloudinary = this.cloudinaryProvider.getCloudinary();
        return cloudinary.uploader.destroy(publicId);
    }

    extractPublicId(url: string): string {
        // Extract public_id from Cloudinary URL
        // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/perfumes/abc123.jpg
        // Returns: perfumes/abc123
        const parts = url.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex === -1) return '';

        const pathParts = parts.slice(uploadIndex + 2); // Skip 'upload' and version
        const filename = pathParts.join('/');
        return filename.replace(/\.[^/.]+$/, ''); // Remove extension
    }
}
