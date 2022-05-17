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
  @Index('campaign_id_idx')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  age: number;
}
