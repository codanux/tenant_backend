import {  IsArray, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ProductPrice } from '../entities/product_price.entity';

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    stock: number;

    @ApiProperty()
    @IsNotEmpty()
    status: boolean;

    
    // ProductPrice array
    @ApiProperty()
    @IsArray()
    @Type(() => ProductPrice)
    prices: ProductPrice[];

}
