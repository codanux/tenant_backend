import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inovice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    total: number;

    
}
