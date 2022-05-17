import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { IContactDb } from '../../collections/contacts/contacts-database.models';
import { ContactsDatabaseService } from '../../collections/contacts/contacts-database.service';

@Injectable()
export class ContactsPgService implements ContactsDatabaseService {
  getAll(): Observable<IContactDb[]> {
    return of([{ name: 'first', age: 2 }]);
  }
}
