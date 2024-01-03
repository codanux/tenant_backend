import { Role } from 'src/auth/auth.decorator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  status: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;  
}