import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FormConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 0 })
  sequence!: number;

  @Column('text')
  fields!: string; // JSON string defining fields
}
