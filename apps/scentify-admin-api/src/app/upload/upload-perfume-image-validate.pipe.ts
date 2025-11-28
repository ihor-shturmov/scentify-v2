import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadPerfumeImageValidatePipe {
    transform(files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new Error('No files uploaded');
        }

        // Validate file types
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const invalidFiles = files.filter(
            (file) => !validTypes.includes(file.mimetype)
        );

        if (invalidFiles.length > 0) {
            throw new Error(
                'Invalid file type. Only JPEG, PNG, and WebP images are allowed'
            );
        }

        return files;
    }
}