import { ApiProperty } from "@nestjs/swagger";

export class CreateTenantDto {

    @ApiProperty({
        description: 'Tenant name',
        default: 'Co Market',
    })
    name: string;

    @ApiProperty({
        description: 'Tenant subdomain',
        default: 'codanux',
    })
    subdomain: string;
    
    @ApiProperty({
        description: 'Database type',
        default: 'mysql',
    })
    type: string;

    @ApiProperty({
        description: 'Database host',
        default: 'localhost',
    })
    host: string;

    @ApiProperty({
        description: 'Database port',
        default: 3306,
    })
    port: number;
    
    @ApiProperty({
        description: 'Database username',
        default: 'root',
    })
    username: string;
    
    @ApiProperty({
        description: 'Database password',
        default: '123456',
    })
    password: string;
    
    @ApiProperty({
        description: 'Database name',
        default: 'tenant_1',
    })
    database: string;
    
}
