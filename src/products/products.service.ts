import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  productRepository: Repository<Product>;

  constructor(
    @Inject('CONNECTION') private readonly connection: DataSource
  ) {
    this.productRepository = connection.getRepository(Product);
  }

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findAll(query) {
    const { page = 1, itemsPerPage = 10, search } = query;
    const q = this.productRepository.createQueryBuilder('product')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .orderBy('product.id', 'DESC')

    if (search) {
      q.where('product.name LIKE :search OR product.description LIKE :search', { search: `%${search}%` });
    }

    const [rows, count] = await q.getManyAndCount();
    return { rows, count };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
