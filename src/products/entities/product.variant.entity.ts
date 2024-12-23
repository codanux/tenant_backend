import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductVariant {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column()
    image: string;

    @Column()
    weight: number;

    @Column()
    length: number;

    @Column()
    width: number;

    @Column()
    height: number;

    @Column()
    barcode: string;

    @Column()
    sku: string;

    @Column()
    status: string;

}
