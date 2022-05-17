import { IContactDb } from '../../collections/contacts/contacts-database.models';

export interface IContactPg {
  id: string;
  name: string;
  age: number;
}

export class ContactPgDto implements IContactDb {
  id: string;
  name: string;
  age: number;

  constructor(entity: IContactPg) {
    const init: IContactDb = {
      id: entity.id,
      name: entity.name,
      age: entity.age,
    };

    Object.assign(this, init);
  }
}
