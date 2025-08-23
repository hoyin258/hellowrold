import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class FormConfig {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  formCd!: string;

  @Column()
  formVersion!: string;

  @Column({ default: 0 })
  displaySeq!: number;

  @Column()
  fields!: {
    fieldId: string;
    fieldName: string;
    label: string;
    type: string;
    option: string[];
  }[]; // Array defining fields
}
