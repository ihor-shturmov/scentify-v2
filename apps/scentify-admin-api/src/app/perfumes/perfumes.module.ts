import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Perfume, PerfumeSchema } from './schemas/perfume.schema';
import { PerfumesController } from './perfumes.controller';
import { PerfumesService } from './perfumes.service';
import { PerfumeRepository } from './repositories/perfume.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Perfume.name, schema: PerfumeSchema }]),
    ],
    controllers: [PerfumesController],
    providers: [PerfumesService, PerfumeRepository],
    exports: [PerfumesService],
})
export class PerfumesModule { }
