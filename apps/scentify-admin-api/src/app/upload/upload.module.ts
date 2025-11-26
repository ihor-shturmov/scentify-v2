import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PerfumesModule } from '../perfumes/perfumes.module';

@Module({
    imports: [CloudinaryModule, PerfumesModule],
    controllers: [UploadController],
})
export class UploadModule { }
