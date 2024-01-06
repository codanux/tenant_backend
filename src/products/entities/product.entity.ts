import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { ProductPrice } from './product_price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  image: string;

  @Column()
  stock: number;

  @Column()
  status: boolean;

  @OneToMany(() => ProductPrice, productPrice => productPrice.product, { cascade: true })
  prices: ProductPrice[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;  
}