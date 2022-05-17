import { IContactDb } from '@app/core/database/collections/contacts/contacts-database.models';
import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateContactDto } from './contacts.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly databaseService: DatabaseService) {}

  createOne(createContactDto: CreateContactDto) {
    return this.databaseService.contactsCreateOne({
      ...createContactDto,
    });
  }

  getOne(contactId: string): Observable<IContactDb> {
    return this.databaseService.contactsGetOne(contactId);
  }
}
