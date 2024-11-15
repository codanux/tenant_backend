import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InoviceProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invoice_id: number;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    total: number;

    
}
