import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

export enum Coin {
  USD = 'usd',
  BTC = 'btc',
  ETH = 'eth',
  BNB = 'bnb',
}

@Entity()
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Coin, default: Coin.USD })
  coin: Coin;
  
  @Column('decimal', { precision: 30, scale: 18 })
  price: number;

  @ManyToOne(() => Product, product => product.prices)
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;  
}