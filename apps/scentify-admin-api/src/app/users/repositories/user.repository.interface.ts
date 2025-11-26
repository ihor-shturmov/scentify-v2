import { User } from '../schemas/user.schema';

/**
 * User Repository Interface
 * Defines the contract for user data access operations
 */
export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<User | null>;
    findActive(): Promise<User[]>;
    findByRole(role: 'admin' | 'user'): Promise<User[]>;
}
