import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Person {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column({ unique: true })
  simpleName!: string;

  @Column()
  fullName!: string;
}
