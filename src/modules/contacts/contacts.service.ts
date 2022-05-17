import { IContactDb } from '@app/core/database/collections/contacts/contacts-database.models';
import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ContactsService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAll(): Observable<IContactDb[]> {
    return this.databaseService.contactsGetAll();
  }
}
