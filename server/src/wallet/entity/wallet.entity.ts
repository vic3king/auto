import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { UserEntity } from '@user/entity/user.entity';

@Entity('wallet')
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'integer', nullable: false }) balance: number;

  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;

  @OneToOne(type => UserEntity)
  @JoinColumn()
  owner?: UserEntity;
}
