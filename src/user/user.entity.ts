import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
