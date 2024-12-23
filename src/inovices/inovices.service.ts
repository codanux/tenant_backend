import { Inject, Injectable } from '@nestjs/common';
import { CreateInoviceDto } from './dto/create-inovice.dto';
import { UpdateInoviceDto } from './dto/update-inovice.dto';
import { DataSource, Repository } from 'typeorm';
import { Inovice } from './entities/inovice.entity';

@Injectable()
export class InovicesService {
  invoiceRepository: Repository<Inovice>;

  constructor(
    @Inject('CONNECTION') private readonly connection: DataSource
  ) {
    this.invoiceRepository = connection.getRepository(Inovice);
  }

  create(createInoviceDto: CreateInoviceDto) {
    return this.invoiceRepository.save(createInoviceDto);
  }

  async findAll(query: any) {
    const { page = 1, itemsPerPage = 10, search } = query;
    const q = this.invoiceRepository.createQueryBuilder('invoice')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .orderBy('invoice.id', 'DESC')

    if (search) {
      q.where('invoice.hash LIKE :search', { search: `%${search}%` });
    }

    const [rows, count] = await q.getManyAndCount();
    return { rows, count };
  }
  
  findOne(id: number) {
    return this.invoiceRepository.findOne({ where: { id } });
  }

  update(id: number, updateInoviceDto: UpdateInoviceDto) {
    return `This action updates a #${id} inovice`;
  }

  remove(id: number) {
    return `This action removes a #${id} inovice`;
  }
}
