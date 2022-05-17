import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  IContactDb,
  ICreateContact,
} from './collections/contacts/contacts-database.models';
import { ContactsDatabaseService } from './collections/contacts/contacts-database.service';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly contactsDatabaseService: ContactsDatabaseService,
  ) {}

  contactsGetOne(contactId: string): Observable<IContactDb> {
    return this.contactsDatabaseService.getOne(contactId);
  }

  contactsCreateOne(createDto: ICreateContact): Observable<IContactDb> {
    return this.contactsDatabaseService.createOne(createDto);
  }

  contactsCreateMany(createDtos: ICreateContact[]): Observable<IContactDb[]> {
    return this.contactsDatabaseService.createMany(createDtos);
  }

  contactsDeleteAll(): Observable<unknown> {
    return this.contactsDatabaseService.deleteAll();
  }
}
