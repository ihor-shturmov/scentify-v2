import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        passwordHash: { type: String, required: true },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isActive: { type: Boolean, default: true },
        lastLogin: { type: Date }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
