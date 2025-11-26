import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
    BadRequestException,
    Param,
    Delete,
    Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PerfumesService } from '../perfumes/perfumes.service';

@Controller('upload')
export class UploadController {
    constructor(
        private cloudinaryService: CloudinaryService,
        private perfumesService: PerfumesService
    ) { }

    @Post('perfume/:id/images')
    @UseInterceptors(FilesInterceptor('images', 10)) // Max 10 images
    async uploadPerfumeImages(
        @Param('id') perfumeId: string,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        // Validate file types
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const invalidFiles = files.filter(
            (file) => !validTypes.includes(file.mimetype)
        );

        if (invalidFiles.length > 0) {
            throw new BadRequestException(
                'Invalid file type. Only JPEG, PNG, and WebP images are allowed'
            );
        }

        // Upload images to Cloudinary
        const imageUrls = await this.cloudinaryService.uploadMultipleImages(
            files,
            `perfumes/${perfumeId}`
        );

        // Update perfume with new image URLs
        const perfume = await this.perfumesService.findOne(perfumeId);
        const updatedImages = [...(perfume.images || []), ...imageUrls];

        await this.perfumesService.update(perfumeId, {
            images: updatedImages,
        });

        return {
            message: 'Images uploaded successfully',
            images: imageUrls,
            totalImages: updatedImages.length,
        };
    }

    @Delete('perfume/:id/image')
    async deletePerfumeImage(
        @Param('id') perfumeId: string,
        @Body('imageUrl') imageUrl: string
    ) {
        // Extract public ID from URL and delete from Cloudinary
        const publicId = this.cloudinaryService.extractPublicId(imageUrl);
        await this.cloudinaryService.deleteImage(publicId);

        // Remove image URL from perfume
        const perfume = await this.perfumesService.findOne(perfumeId);
        const updatedImages = (perfume.images || []).filter(
            (url) => url !== imageUrl
        );

        await this.perfumesService.update(perfumeId, {
            images: updatedImages,
        });

        return {
            message: 'Image deleted successfully',
            remainingImages: updatedImages.length,
        };
    }
}
