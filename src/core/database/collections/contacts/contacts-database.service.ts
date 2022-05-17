import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IContactDb } from './contacts-database.models';

@Injectable()
export abstract class ContactsDatabaseService {
  abstract createOne(createDto: IContactDb): Observable<IContactDb>;
  abstract getOne(contactId: string): Observable<IContactDb>;
}
