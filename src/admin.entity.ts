import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Admin {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;
}
