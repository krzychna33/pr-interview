import { IContactDb } from '../../collections/contacts/contacts-database.models';

export interface IContactPg {
  id: string;
  created_date: Date;
  updated_date: Date;

  first_name: string;
  last_name: string;
  age: number;
  email: string;
}

export class ContactPgDto implements IContactDb {
  id: string;
  createdDate: Date;
  updatedDate: Date;

  firstName: string;
  lastName: string;
  age: number;
  email: string;

  constructor(entity: IContactPg) {
    const init: IContactDb = {
      id: entity.id,
      createdDate: entity.created_date,
      updatedDate: entity.updated_date,

      firstName: entity.first_name,
      lastName: entity.last_name,
      age: entity.age,
      email: entity.email,
    };

    Object.assign(this, init);
  }
}
