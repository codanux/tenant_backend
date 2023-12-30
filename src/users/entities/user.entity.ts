import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;
  

  @ApiProperty({ example: 'codanux', description: 'username bro' })
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