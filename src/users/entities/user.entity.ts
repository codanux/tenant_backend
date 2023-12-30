import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  firebase_id: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
  
}