import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { IUserRepository } from './user.repository.interface';

/**
 * User Repository Implementation
 * Handles all database operations for User entity
 */
@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async create(userData: Partial<User>): Promise<UserDocument> {
        const user = new this.userModel(userData);
        return user.save();
    }

    async update(id: string, userData: Partial<User>): Promise<UserDocument | null> {
        return this.userModel
            .findByIdAndUpdate(id, userData, { new: true })
            .exec();
    }

    async delete(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async findActive(): Promise<UserDocument[]> {
        return this.userModel.find({ isActive: true }).exec();
    }

    async findByRole(role: 'admin' | 'user'): Promise<UserDocument[]> {
        return this.userModel.find({ role }).exec();
    }
}
