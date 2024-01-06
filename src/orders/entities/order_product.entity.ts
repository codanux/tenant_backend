import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductPrice, Coin } from 'src/products/entities/product_price.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'enum', enum: Coin, default: Coin.USD })
  coin: Coin;

  @Column('decimal', { precision: 30, scale: 18 })
  price: number;

  @Column()
  status: boolean;

  @ManyToOne(() => Order, order => order.order_products)
  order: Order;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;  
}