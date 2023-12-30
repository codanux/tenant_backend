import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    
    @ApiProperty({ example: 'test@test.com' })
    @IsEmail({})
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;
    
    @ApiProperty()
    @IsNotEmpty()
    firebase_id: string;

    @ApiProperty()
    is_active: boolean;

    @ApiProperty()
    is_admin: boolean;
}
