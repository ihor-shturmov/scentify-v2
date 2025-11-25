import mongoose, { Schema, Document } from 'mongoose';

export interface IPerfume extends Document {
    name: string;
    brand: string;
    description: string;
    price: number;
    scentFamily: 'floral' | 'woody' | 'oriental' | 'fresh' | 'citrus' | 'gourmand';
    type: 'eau_de_parfum' | 'eau_de_toilette' | 'parfum' | 'cologne';
    gender: 'male' | 'female' | 'unisex';
    fragranceNotes: {
        top: string[];
        middle: string[];
        base: string[];
    };
    sizes: Array<{
        volume: number;
        price: number;
    }>;
    rating: number;
    reviewCount: number;
    imageUrl?: string;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PerfumeSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        scentFamily: {
            type: String,
            enum: ['floral', 'woody', 'oriental', 'fresh', 'citrus', 'gourmand'],
            required: true
        },
        type: {
            type: String,
            enum: ['eau_de_parfum', 'eau_de_toilette', 'parfum', 'cologne'],
            required: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'unisex'],
            required: true
        },
        fragranceNotes: {
            top: [{ type: String }],
            middle: [{ type: String }],
            base: [{ type: String }]
        },
        sizes: [
            {
                volume: { type: Number, required: true },
                price: { type: Number, required: true }
            }
        ],
        rating: { type: Number, default: 0, min: 0, max: 5 },
        reviewCount: { type: Number, default: 0 },
        imageUrl: { type: String },
        inStock: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

// Indexes for better query performance
PerfumeSchema.index({ name: 'text', brand: 'text', description: 'text' });
PerfumeSchema.index({ scentFamily: 1 });
PerfumeSchema.index({ gender: 1 });
PerfumeSchema.index({ rating: -1 });

export default mongoose.model<IPerfume>('Perfume', PerfumeSchema);
