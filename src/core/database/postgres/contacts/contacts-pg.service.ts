import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { Observable } from 'rxjs';
import { IContactDb } from '../../collections/contacts/contacts-database.models';
import { ContactsDatabaseService } from '../../collections/contacts/contacts-database.service';
import { ContactPgDto } from './contacts-pg.models';
import { ContactPgRepository } from './contacts-pg.repository';

@Injectable()
export class ContactsPgService implements ContactsDatabaseService {
  constructor(
    @InjectRepository(ContactPgRepository)
    private contactPgRepository: ContactPgRepository,
  ) {}

  createOne(createDto: IContactDb): Observable<IContactDb> {
    return from(this.contactPgRepository.createOne(createDto)).pipe(
      map((contactPg) => new ContactPgDto(contactPg)),
    );
  }

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
}
