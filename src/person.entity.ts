import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  simpleName!: string;

  @Column()
  fullName!: string;
}
