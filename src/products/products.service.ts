import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Coin, ProductPrice } from './entities/product_price.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const [rows, total_count] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
      relations: ['prices'],
      select: {
        id: true,
        name: true,
        description: true,
        stock: true,
        status: true,
        prices: {
          id: true,
          price: true,
          coin: true,
        },
      }
    });
    return { rows , total_count}
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.stock = createProductDto.stock;
    product.status = createProductDto.status;
    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.stock = updateProductDto.stock;
    product.status = updateProductDto.status;
    product.prices = updateProductDto.prices
    return this.productsRepository.save(product);
  }

  remove(id: number) {
    return this.productsRepository.softDelete(id);
  }
}
