import { Injectable } from '@nestjs/common';

import { AddressEntity } from './address.entity';
import { ICreateAddress } from '@core/models/address.model';

@Injectable()
export class AddressService {
  public async createMany(
    createAddresses: ICreateAddress[],
  ): Promise<AddressEntity[]> {
    // TODO Implement
    throw Error('Method not implemented');
  }
}
