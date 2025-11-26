import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PerfumesService } from "./perfumes.service";
import { CreatePerfumeDto } from "./dto/create-perfume.dto";
import { UpdatePerfumeDto } from "./dto/update-perfume.dto";

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

    @Patch(':id')
    updatePerfume(@Param('id') id: string, @Body() updatePerfumeDto: UpdatePerfumeDto) {
        return this.perfumesService.update(id, updatePerfumeDto);
    }

    @Delete(':id')
    deletePerfume(@Param('id') id: string) {
        return this.perfumesService.remove(id);
    }
}
