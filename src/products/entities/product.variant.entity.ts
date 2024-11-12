import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductVariant {
    
    @PrimaryGeneratedColumn()
    id: number;

}
