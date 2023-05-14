import { Exclude, Expose } from "class-transformer";
import { Link } from "src/link/link.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    transaction_id:number;

    @Column()
    user_id:number;

    @Column()
    code:string;

    @Column()
    ambassador_email:string;

    @Exclude()
    @Column()
    firstName:string;

    @Exclude()
    @Column()
    lastName:string;

    @Column()
    email:string;

    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    country:string;

    @Column({nullable:true})
    city:string;

    @Column({nullable:true})
    zip:string;

    @Exclude()
    @Column({default:false})
    complete:boolean;

    @ManyToOne(()=>Link, link=>link.orders,{
        createForeignKeyConstraints:false
    })
    @JoinColumn({
        referencedColumnName:'code',
        name:'code'
    })
    link:Link;

    @OneToMany(()=>OrderItem, orderItem=> orderItem.order)
    order_items:OrderItem[];

    @Expose()
    get name(){
        return `${this.firstName} ${this.lastName}`
    }

    @Expose()
    get total(){
        return this.order_items.reduce((total, item)=>total+item.admin_revenue,0)
    }
}