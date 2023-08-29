import { IAddress } from '@core/models/address.model';
import { AddressService } from '@database/address/address.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICreateAddress } from '../models/address.model';
import { IContact, ICreateContact } from '../models/contact.model';
import { ContactService } from './contact/contact.service';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly contactService: ContactService,
    private readonly addressService: AddressService,
  ) {}

  public contactsGetOne(contactId: string): Observable<IContact> {
    return from(this.contactService.getOne(contactId)).pipe(
      map((contact) => {
        if (!contact)
          throw new NotFoundException(
            `Could not find contact by id ${contactId}`,
          );
        return contact;
      }),
    );
  }
  public contactsCreateOne(createDto: ICreateContact): Observable<IContact> {
    return from(this.contactService.createOne(createDto));
  }

  public contactsCreateMany(
    createDtos: ICreateContact[],
  ): Observable<IContact[]> {
    return from(this.contactService.createMany(createDtos));
  }

  public addressesCreateMany(
    createAddresses: ICreateAddress[],
  ): Observable<IAddress[]> {
    return from(this.addressService.createMany(createAddresses));
  }
}
