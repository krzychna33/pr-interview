import { IContactDb } from '@app/core/database/collections/contacts/contacts-database.models';
import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContactsService } from './contacts.service';

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  getAll(): Observable<IContactDb[]> {
    return this.contactsService.getAll();
  }
}
