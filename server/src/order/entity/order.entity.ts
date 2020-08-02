import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { UserEntity } from '@user/entity/user.entity';
import { CarEntity } from '@car/entity/car.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;

  @Column({ type: 'boolean', default: 'True' })
  isPurchased?: Boolean;

  @OneToOne(type => CarEntity)
  @JoinColumn()
  car: CarEntity;

  @ManyToOne(type => UserEntity)
  owner: UserEntity;
}
