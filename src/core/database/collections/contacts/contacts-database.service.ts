import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IContactDb, ICreateContact } from './contacts-database.models';

@Injectable()
export abstract class ContactsDatabaseService {
  abstract getOne(contactId: string): Observable<IContactDb>;

  abstract createOne(createDto: ICreateContact): Observable<IContactDb>;

  abstract createMany(createDtos: ICreateContact[]): Observable<IContactDb[]>;

  abstract deleteAll(ids: string[]): Observable<unknown>;
}
