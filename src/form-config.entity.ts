import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class FormConfig {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  name!: string;

  @Column({ default: 0 })
  sequence!: number;

  @Column()
  fields!: any[]; // Array defining fields
}
