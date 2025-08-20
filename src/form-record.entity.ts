import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FormConfig } from './form-config.entity';

@Entity()
export class FormRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => FormConfig, { onDelete: 'CASCADE' })
  form!: FormConfig;

  @Column('text')
  data!: string; // JSON of submitted values
}
