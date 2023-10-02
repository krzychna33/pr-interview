import { CommonBaseEntity } from '../common/common.baseEntity';
import { IAddress } from '@core/models/address.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ContactEntity } from '@database/contact/contact.entity';

@Entity()
export class AddressEntity extends CommonBaseEntity implements IAddress {
  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @ManyToOne(() => ContactEntity, (contact) => contact.addresses, {
    onDelete: 'CASCADE',
  })
  contact: ContactEntity;
}
