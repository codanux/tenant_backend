import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsEmail({})
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
