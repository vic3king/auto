import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
@Entity('car')
export class CarEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar', nullable: false })
  make: string;

  @Column({ type: 'varchar', nullable: false })
  model: string;

  @Column({ type: 'varchar', nullable: false })
  vin: string;

  @Column({ type: 'integer', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  features?: string; // could also be an array...

  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;
}
