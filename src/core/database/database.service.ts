import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IContact, ICreateContact } from '../models/contact.model';
import { ContactRepository } from './contacts/contacts.repository';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(ContactRepository)
    private readonly contactRepository: ContactRepository,
  ) {}

  public contactsGetOne(contactId: string): Observable<IContact> {
    return from(this.contactRepository.getOne(contactId)).pipe(
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
    return from(this.contactRepository.createOne(createDto));
  }
  public contactsCreateMany(
    createDtos: ICreateContact[],
  ): Observable<IContact[]> {
    return from(this.contactRepository.createMany(createDtos));
  }
  public contactsDeleteAll(ids: string[]) {
    return from(this.contactRepository.deleteAll(ids));
  }
}
