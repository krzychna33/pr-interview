import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { IContact, ICreateContact } from '../models/contact.model';
import { ContactService } from './contact/contact.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly contactRepository: ContactService) {}

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
}
