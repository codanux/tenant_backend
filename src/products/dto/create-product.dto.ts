import { IsIBAN, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly stock: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly status: boolean;

}
