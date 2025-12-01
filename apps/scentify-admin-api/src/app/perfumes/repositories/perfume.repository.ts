import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfume, PerfumeDocument } from '../schemas/perfume.schema';
import { IPerfumeRepository } from './perfume.repository.interface';

/**
 * Perfume Repository Implementation
 * Handles all database operations for Perfume entity
 */
@Injectable()
export class PerfumeRepository implements IPerfumeRepository {
    constructor(
        @InjectModel(Perfume.name) private readonly perfumeModel: Model<PerfumeDocument>
    ) { }

    async findAll(skip = 0, limit = 10): Promise<Perfume[]> {
        return this.perfumeModel.find().skip(skip).limit(limit).exec();
    }

    async count(): Promise<number> {
        return this.perfumeModel.countDocuments().exec();
    }

    async findById(id: string): Promise<Perfume | null> {
        return this.perfumeModel.findById(id).exec();
    }

    async create(perfumeData: Partial<Perfume>): Promise<Perfume> {
        const perfume = new this.perfumeModel(perfumeData);
        return perfume.save();
    }

    async update(id: string, perfumeData: Partial<Perfume>): Promise<Perfume | null> {
        return this.perfumeModel
            .findByIdAndUpdate(id, perfumeData, { new: true })
            .exec();
    }

    async delete(id: string): Promise<Perfume | null> {
        return this.perfumeModel.findByIdAndDelete(id).exec();
    }

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
