import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Observable } from 'rxjs';
import {
  IContactDb,
  ICreateContact,
} from '../../collections/contacts/contacts-database.models';
import { ContactsDatabaseService } from '../../collections/contacts/contacts-database.service';
import { ContactPgDto } from './contacts-pg.models';
import { ContactPgRepository } from './contacts-pg.repository';

@Injectable()
export class ContactsPgService implements ContactsDatabaseService {
  constructor(
    @InjectRepository(ContactPgRepository)
    private contactPgRepository: ContactPgRepository,
  ) {}

  getOne(contactId: string): Observable<IContactDb> {
    return from(this.contactPgRepository.getOne(contactId)).pipe(
      map((contactPg) => {
        if (!contactPg)
          throw new NotFoundException(
            `Could not find contact by id ${contactId}`,
          );

        return new ContactPgDto(contactPg);
      }),
    );
  }

  createOne(createDto: ICreateContact): Observable<IContactDb> {
    return from(this.contactPgRepository.createOne(createDto)).pipe(
      map((contactPg) => new ContactPgDto(contactPg)),
    );
  }

  createMany(createDtos: ICreateContact[]): Observable<IContactDb[]> {
    return from(this.contactPgRepository.createMany(createDtos)).pipe(
      map((contactPg) =>
        contactPg.map((contactPg) => new ContactPgDto(contactPg)),
      ),
    );
  }

  deleteAll(): Observable<unknown> {
    return from(this.contactPgRepository.deleteAll());
  }
}
