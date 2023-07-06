import { IContact } from '@app/core/models/contact.model';
import { Column, Entity } from 'typeorm';
import { CommonBaseEntity } from '../common/common.baseEntity';

@Entity()
export class ContactEntity extends CommonBaseEntity implements IContact {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'varchar' })
  email: string;
}
