import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DataSourceOptions } from "typeorm";

enum DataSourceType {
    MYSQL = 'mysql',
    POSTGRES = 'postgres',
    MSSQL = 'mssql',
}

@Entity()
export class Tenant {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: DataSourceType,
        default: 'mysql',
    })
    type: string;

    @Column()
    database: string;

    @Column({
        default: 'localhost',
    })
    host: string;

    @Column({
        default: 3306,
    })
    port: number;

    @Column({
        default: 'root',
    })
    username: string;

    @Column()
    password: string;

    @Column({
        default: true,
    })
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;   

    @DeleteDateColumn()
    deleted_at: Date;
    

}
