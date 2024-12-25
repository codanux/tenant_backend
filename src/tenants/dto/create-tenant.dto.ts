import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTenantDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    slug: string;
    
    @ApiProperty({
        example: 'localhost',
        description: 'Host of the database'
    })
    @IsNotEmpty()
    host: string;
    
    @ApiProperty({
        example: 3306,
        description: 'Port of the database'
    })
    @IsNotEmpty()
    port: number;
    
    @ApiProperty({
        example: 'root',
        description: 'Username of the database'
    })
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({
        example: '123456',
        description: 'Password of the database'
    })
    @IsNotEmpty()
    password: string;
    
    @ApiProperty({
        example: 'my_database',
        description: 'Name of the database'
    })
    @IsNotEmpty()
    database: string;
}

