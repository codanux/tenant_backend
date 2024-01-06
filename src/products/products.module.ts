import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductPrice } from './entities/product_price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPrice])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
