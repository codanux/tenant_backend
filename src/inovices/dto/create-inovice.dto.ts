import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Status } from "../entities/inovice.entity";
export class CreateInoviceDto {

    @ApiProperty()
    @IsNotEmpty()
    customerId: number;

    @ApiProperty()
    @IsNotEmpty()
    total: number;

    @ApiProperty()
    @IsNotEmpty()
    discount: number;

    @ApiProperty({
        enum: Status,
        default: Status.PENDING
    })
    @IsNotEmpty()
    status: string;

}
