import { CommonBaseEntity } from '../common/common.baseEntity';
import { IAddress } from '@core/models/address.model';

// TODO Implement Entity
export class AddressEntity extends CommonBaseEntity implements IAddress {
  address: string;
  city: string;
  postalCode: string;
}
