import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PerfumeType, ScentFamily } from '@scentify/shared-types';

export type PerfumeDocument = Perfume & Document;

// Nested schema for fragrance notes
@Schema({ _id: false })
export class FragranceNotes {
    @Prop({ type: [String], default: [] })
    top!: string[];

    @Prop({ type: [String], default: [] })
    middle!: string[];

    @Prop({ type: [String], default: [] })
    base!: string[];
}

// Nested schema for product sizes
@Schema({ _id: false })
export class ProductSize {
    @Prop({ required: false })
    volume?: number;

    @Prop({ required: false })
    price?: number;

    @Prop({ default: 0 })
    stock?: number;
}

@Schema({ timestamps: true })
export class Perfume {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    brand!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: false })
    price?: number;

    @Prop({
        type: String,
        enum: Object.values(PerfumeType),
        required: true
    })
    type!: PerfumeType;

    @Prop({
        type: String,
        enum: Object.values(ScentFamily),
        required: true
    })
    scentFamily!: ScentFamily;

    @Prop({
        type: String,
        enum: ['male', 'female', 'unisex'],
        required: true
    })
    gender!: 'male' | 'female' | 'unisex';

    @Prop({ type: [ProductSize], default: [] })
    sizes?: ProductSize[];

    @Prop({ type: FragranceNotes, required: true })
    fragranceNotes!: FragranceNotes;

    @Prop({ type: [String], default: [] })
    images!: string[];

    @Prop({ type: Number, default: 0, min: 0, max: 5 })
    rating!: number;

    @Prop({ type: Number, default: 0 })
    reviewCount!: number;

    @Prop({ type: Boolean, default: true })
    inStock!: boolean;

    @Prop({ type: Date })
    releaseDate?: Date;
}

export const PerfumeSchema = SchemaFactory.createForClass(Perfume);

// 🔹 Virtual `id` that mirrors `_id`
PerfumeSchema.virtual('id').get(function (this: PerfumeDocument) {
    return this._id.toHexString();
});

// 🔹 Control JSON output (what Nest sends to FE)
PerfumeSchema.set('toJSON', {
    virtuals: true,      // include `id`
    versionKey: false,   // hide `__v`
    transform: (_: unknown, ret: unknown) => {
        const retObj = ret as Record<string, unknown>;
        delete retObj._id;  // hide original _id
        return retObj;
    },
});

// Create indexes for better query performance
PerfumeSchema.index({ name: 'text', brand: 'text', description: 'text' });
PerfumeSchema.index({ scentFamily: 1 });
PerfumeSchema.index({ gender: 1 });
PerfumeSchema.index({ rating: -1 });
PerfumeSchema.index({ price: 1 });
