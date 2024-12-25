import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Currency {
    TRY = 'TL',
    USD = 'USD',
    EUR = 'EUR',
}

@Entity()
export class UserBalance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    amount: number;

    @Column({
        type: 'enum',
        enum: Currency,
        default: Currency.TRY,
    })
    currency: string;

    @Column()
    hash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
}
