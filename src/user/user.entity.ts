import { Exclude, Expose } from 'class-transformer';
import { Order } from '../order/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique:true })
  email: string;
  
  @Exclude()
  @Column()
  password: string

  @Column({ default:false })
  is_ambassador: boolean

  @OneToMany(()=>Order, order=>order.user,{
    createForeignKeyConstraints:false
  })
  orders: Order[];

  get revenue():number{
    return this.orders.filter(ord=>ord.complete).reduce((s, ord)=> s+ord.ambassador_revenue ,0)
  }
}
