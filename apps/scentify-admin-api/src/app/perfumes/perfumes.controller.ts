import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PerfumesService } from "./perfumes.service";
import { CreatePerfumeDto } from "./dto/create-perfume.dto";

@Controller('perfumes')
export class PerfumesController {
    constructor(private readonly perfumesService: PerfumesService) { }

    @Get()
    getPerfumes() {
        return this.perfumesService.findAll();
    }

    @Get(':id')
    getPerfumeById(@Param('id') id: string) {
        return this.perfumesService.findOne(id);
    }

    @Post()
    createPerfume(@Body() createPerfumeDto: CreatePerfumeDto) {
        return this.perfumesService.create(createPerfumeDto);
    }
}
