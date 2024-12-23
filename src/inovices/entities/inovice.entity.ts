import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
    PENDING = 'pending',
    PAID = 'paid',
    CANCELED = 'canceled'
}

@Entity()
export class Inovice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;
    
    @Column()
    total: number;

    @Column()
    discount: number;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING
    })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
