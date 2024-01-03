import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [rows, total_count] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { rows , total_count}
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
