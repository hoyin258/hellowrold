import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class FormRecord {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column(() => ObjectId)
  formId!: ObjectId;

  @Column()
  data!: any; // submitted values
}