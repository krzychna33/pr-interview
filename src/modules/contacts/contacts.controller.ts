import { IContactDb } from '@app/core/database/collections/contacts/contacts-database.models';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateContactDto } from './contacts.dto';
import { ContactsService } from './contacts.service';

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  createOne(
    @Body(ValidationPipe) createContactDto: CreateContactDto,
  ): Observable<IContactDb> {
    return this.contactsService.createOne(createContactDto);
  }

  @Get(':contactId')
  getOne(@Param('contactId') contactId: string): Observable<IContactDb> {
    return this.contactsService.getOne(contactId);
  }
}
