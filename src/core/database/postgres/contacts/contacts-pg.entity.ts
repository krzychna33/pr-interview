import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IContactPg } from './contacts-pg.models';

@Entity()
export class ContactPg extends BaseEntity implements IContactPg {
  @PrimaryGeneratedColumn('uuid')
  @Index('contact_id_idx')
  id: string;

  @Column({ type: 'timestamptz' })
  created_date: Date;

  @Column({ type: 'timestamptz' })
  updated_date: Date;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'varchar' })
  email: string;
}
