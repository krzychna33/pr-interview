import { Injectable, NotFoundException } from '@nestjs/common';

import { AddressEntity } from './address.entity';
import { ICreateAddress } from '@core/models/address.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactService } from '@database/contact/contact.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepo: Repository<AddressEntity>,
    private readonly contactService: ContactService,
  ) {}

  public async createMany(
    createAddresses: ICreateAddress[],
    contactId: string,
  ): Promise<AddressEntity[]> {
    const relatedContact = await this.contactService.getOne(contactId);

    if (!relatedContact) {
      throw new NotFoundException('Contact not found');
    }

    const newAddresses = createAddresses.map((dto) => {
      const newAddress = new AddressEntity();
      newAddress.city = dto.city;
      newAddress.postalCode = dto.postalCode;
      newAddress.address = dto.address;

      newAddress.contact = relatedContact;

      return newAddress;
    });

    await this.addressRepo.save(newAddresses);

    return newAddresses;
  }
}
