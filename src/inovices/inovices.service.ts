import { Injectable } from '@nestjs/common';
import { CreateInoviceDto } from './dto/create-inovice.dto';
import { UpdateInoviceDto } from './dto/update-inovice.dto';

@Injectable()
export class InovicesService {
  create(createInoviceDto: CreateInoviceDto) {
    return 'This action adds a new inovice';
  }

  findAll() {
    return `This action returns all inovices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inovice`;
  }

  update(id: number, updateInoviceDto: UpdateInoviceDto) {
    return `This action updates a #${id} inovice`;
  }

  remove(id: number) {
    return `This action removes a #${id} inovice`;
  }
}
