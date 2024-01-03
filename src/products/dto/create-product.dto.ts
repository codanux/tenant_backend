import {  IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

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
    @IsNotEmpty()
    @IsDecimal()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    stock: number;

    @ApiProperty()
    @IsNotEmpty()
    status: boolean;

}
