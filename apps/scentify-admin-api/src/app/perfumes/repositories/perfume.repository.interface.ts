import { Perfume } from '../schemas/perfume.schema';

/**
 * Perfume Repository Interface
 * Defines the contract for perfume data access operations
 */
export interface IPerfumeRepository {
    findAll(): Promise<Perfume[]>;
    findById(id: string): Promise<Perfume | null>;
    create(perfumeData: Partial<Perfume>): Promise<Perfume>;
    update(id: string, perfumeData: Partial<Perfume>): Promise<Perfume | null>;
    delete(id: string): Promise<Perfume | null>;
    findByBrand(brand: string): Promise<Perfume[]>;
    findByScentFamily(scentFamily: string): Promise<Perfume[]>;
    findByGender(gender: string): Promise<Perfume[]>;
    search(query: string): Promise<Perfume[]>;
}
