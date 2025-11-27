import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserDocument } from './schemas/user.schema';

/**
 * Users Service
 * Contains business logic for user operations
 */
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async findAll(): Promise<UserDocument[]> {
        return this.userRepository.findAll();
    }

    async findOne(id: string): Promise<UserDocument> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: string, updateData: Partial<UserDocument>): Promise<UserDocument> {
        const user = await this.userRepository.update(id, updateData);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async remove(id: string): Promise<UserDocument> {
        const user = await this.userRepository.delete(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userRepository.findByEmail(email);
    }

    async findActive(): Promise<UserDocument[]> {
        return this.userRepository.findActive();
    }

    async findByRole(role: 'admin' | 'user'): Promise<UserDocument[]> {
        return this.userRepository.findByRole(role);
    }
}
