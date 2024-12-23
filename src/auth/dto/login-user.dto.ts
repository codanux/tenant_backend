import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
   
    @ApiProperty()
    token: string;
}
