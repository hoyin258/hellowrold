import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class FormRecord {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  formId!: ObjectId;

  @Column()
  data!: any; // submitted values
}
