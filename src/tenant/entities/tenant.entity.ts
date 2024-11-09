import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tenant {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    subdomain: string;

    @Column()
    database: string;

    @Column()
    host: string;

    @Column()
    port: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    ssl: boolean;

    @Column()
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;   

    @DeleteDateColumn()
    deleted_at: Date;

}
