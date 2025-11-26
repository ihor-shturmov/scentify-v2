import { Injectable, NotFoundException } from '@nestjs/common';
import { PerfumeRepository } from './repositories/perfume.repository';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { Perfume } from './schemas/perfume.schema';

/**
 * Perfumes Service
 * Contains business logic for perfume operations
 */
@Injectable()
export class PerfumesService {
    constructor(private readonly perfumeRepository: PerfumeRepository) { }

    async create(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
        return this.perfumeRepository.create(createPerfumeDto);
    }

    async findAll(): Promise<Perfume[]> {
        return this.perfumeRepository.findAll();
    }

    async findOne(id: string): Promise<Perfume> {
        const perfume = await this.perfumeRepository.findById(id);
        if (!perfume) {
            throw new NotFoundException(`Perfume with ID ${id} not found`);
        }
        return perfume;
    }

    async update(id: string, updatePerfumeDto: UpdatePerfumeDto): Promise<Perfume> {
        const perfume = await this.perfumeRepository.update(id, updatePerfumeDto);
        if (!perfume) {
            throw new NotFoundException(`Perfume with ID ${id} not found`);
        }
        return perfume;
    }

    async remove(id: string): Promise<Perfume> {
        const perfume = await this.perfumeRepository.delete(id);
        if (!perfume) {
            throw new NotFoundException(`Perfume with ID ${id} not found`);
        }
        return perfume;
    }

    async findByBrand(brand: string): Promise<Perfume[]> {
        return this.perfumeRepository.findByBrand(brand);
    }

    async findByScentFamily(scentFamily: string): Promise<Perfume[]> {
        return this.perfumeRepository.findByScentFamily(scentFamily);
    }

    async findByGender(gender: string): Promise<Perfume[]> {
        return this.perfumeRepository.findByGender(gender);
    }

    async search(query: string): Promise<Perfume[]> {
        return this.perfumeRepository.search(query);
    }
}