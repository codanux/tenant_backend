import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

enum Coin {
  USD = 'usd',
  BTC = 'btc',
  ETH = 'eth',
}

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

  @ManyToOne(() => Order, order => order.order_products, {})
  order: Order;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;  
}