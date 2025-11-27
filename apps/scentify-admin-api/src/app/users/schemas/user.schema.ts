import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    firstName!: string;

    @Prop({ required: true })
    lastName!: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email!: string;

    @Prop({ required: true })
    passwordHash!: string;

    @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
    role!: string;

    @Prop({ type: Boolean, default: true })
    isActive!: boolean;

    @Prop({ type: Date })
    lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Virtual `id` that mirrors `_id`
UserSchema.virtual('id').get(function (this: UserDocument) {
    return this._id.toHexString();
});

// Control JSON output (what gets sent to frontend)
UserSchema.set('toJSON', {
    virtuals: true,      // include `id`
    versionKey: false,   // hide `__v`
    transform: (_: unknown, ret: unknown) => {
        const retObj = ret as Record<string, unknown>;
        delete retObj._id;      // hide original _id
        delete retObj.passwordHash; // never expose password hash
        return retObj;
    },
});

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
