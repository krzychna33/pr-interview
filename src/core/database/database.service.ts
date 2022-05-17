import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IContactDb } from './collections/contacts/contacts-database.models';
import { ContactsDatabaseService } from './collections/contacts/contacts-database.service';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly contactsDatabaseService: ContactsDatabaseService,
  ) {}

  contactsCreateOne(createContact: IContactDb): Observable<IContactDb> {
    return this.contactsDatabaseService.createOne(createContact);
  }

  contactsGetOne(contactId: string): Observable<IContactDb> {
    return this.contactsDatabaseService.getOne(contactId);
  }
}
