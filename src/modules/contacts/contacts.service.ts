import { ICreateContact } from '@app/core/database/collections/contacts/contacts-database.models';
import { DatabaseService } from '@database/database.service';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseContactDto } from './contacts.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly databaseService: DatabaseService) {}

  getOne(contactId: string): Observable<ResponseContactDto> {
    return this.databaseService
      .contactsGetOne(contactId)
      .pipe(map((contact) => new ResponseContactDto(contact)));
  }

  createOne(createDto: ICreateContact): Observable<ResponseContactDto> {
    return this.databaseService
      .contactsCreateOne(createDto)
      .pipe(map((contact) => new ResponseContactDto(contact)));
  }

  createMany(createDtos: ICreateContact[]): Observable<ResponseContactDto[]> {
    return this.databaseService
      .contactsCreateMany(createDtos)
      .pipe(
        map((contacts) =>
          contacts.map((contact) => new ResponseContactDto(contact)),
        ),
      );
  }
}
