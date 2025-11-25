import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfume, PerfumeDocument } from './schemas/perfume.schema';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';

@Injectable()
export class PerfumesService {
    constructor(
        @InjectModel(Perfume.name) private perfumeModel: Model<PerfumeDocument>
    ) { }

    async create(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
        const createdPerfume = new this.perfumeModel(createPerfumeDto);
        return createdPerfume.save();
    }

    async findAll(): Promise<Perfume[]> {
        const perfumes = await this.perfumeModel.find().exec();

        return perfumes;
    }

    async findOne(id: string): Promise<Perfume> {
        const perfume = await this.perfumeModel.findById(id).exec();
        if (!perfume) {
            throw new NotFoundException(`Perfume with ID ${id} not found`);
        }
        return perfume;
    }

    async update(id: string, updatePerfumeDto: UpdatePerfumeDto): Promise<Perfume> {
        const updatedPerfume = await this.perfumeModel
            .findByIdAndUpdate(id, updatePerfumeDto, { new: true })
            .exec();

        if (!updatedPerfume) {
            throw new NotFoundException(`Perfume with ID ${id} not found`);
        }

        return updatedPerfume;
    }

    async remove(id: string): Promise<Perfume> {
        const deletedPerfume = await this.perfumeModel.findByIdAndDelete(id).exec();

        if (!deletedPerfume) {
            throw new NotFoundException(`Perfume with ID ${id} not found`);
        }

        return deletedPerfume;
    }

    // Additional query methods
    async findByBrand(brand: string): Promise<Perfume[]> {
        return this.perfumeModel.find({ brand }).exec();
    }

    async findByScentFamily(scentFamily: string): Promise<Perfume[]> {
        return this.perfumeModel.find({ scentFamily }).exec();
    }

    async findByGender(gender: string): Promise<Perfume[]> {
        return this.perfumeModel.find({ gender }).exec();
    }

    async search(query: string): Promise<Perfume[]> {
        return this.perfumeModel
            .find({ $text: { $search: query } })
            .exec();
    }
}