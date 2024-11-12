import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({})
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber({
  })
  price: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  image: string;
}
