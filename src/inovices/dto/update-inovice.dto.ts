import { PartialType } from '@nestjs/swagger';
import { CreateInoviceDto } from './create-inovice.dto';

export class UpdateInoviceDto extends PartialType(CreateInoviceDto) {}
