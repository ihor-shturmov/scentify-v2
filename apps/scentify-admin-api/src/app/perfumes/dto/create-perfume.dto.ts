import { IsString, IsNumber, IsEnum, IsArray, IsBoolean, IsOptional, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PerfumeType, ScentFamily } from '@scentify/shared-types';

export class FragranceNotesDto {
    @IsArray()
    @IsString({ each: true })
    top!: string[];

    @IsArray()
    @IsString({ each: true })
    middle!: string[];

    @IsArray()
    @IsString({ each: true })
    base!: string[];
}

export class ProductSizeDto {
    @IsNumber()
    @IsOptional()
    volume?: number;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    stock?: number;
}

export class CreatePerfumeDto {
    @IsString()
    name!: string;

    @IsString()
    brand!: string;

    @IsString()
    description!: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsEnum(PerfumeType)
    type!: PerfumeType;

    @IsEnum(ScentFamily)
    scentFamily!: ScentFamily;

    @IsEnum(['male', 'female', 'unisex'])
    gender!: 'male' | 'female' | 'unisex';

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductSizeDto)
    sizes?: ProductSizeDto[];

    @ValidateNested()
    @Type(() => FragranceNotesDto)
    fragranceNotes!: FragranceNotesDto;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsOptional()
    rating?: number;

    @IsNumber()
    @IsOptional()
    reviewCount?: number;

    @IsBoolean()
    @IsOptional()
    inStock?: boolean;

    @IsOptional()
    releaseDate?: Date;
}
