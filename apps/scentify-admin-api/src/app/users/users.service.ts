import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './schemas/user.schema';

/**
 * Users Service
 * Contains business logic for user operations
 */
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: string, updateData: Partial<User>): Promise<User> {
        const user = await this.userRepository.update(id, updateData);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async remove(id: string): Promise<User> {
        const user = await this.userRepository.delete(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async findActive(): Promise<User[]> {
        return this.userRepository.findActive();
    }

    async findByRole(role: 'admin' | 'user'): Promise<User[]> {
        return this.userRepository.findByRole(role);
    }
}
