import { EntityRepository, Repository } from 'typeorm';
import { IContactDb } from '../../collections/contacts/contacts-database.models';
import { ContactPg } from './contacts-pg.entity';

@EntityRepository(ContactPg)
export class ContactPgRepository extends Repository<ContactPg> {
  public async createOne(createContact: IContactDb): Promise<ContactPg> {
    const contact = new ContactPg();
    contact.name = createContact.name;
    contact.age = createContact.age;

    return await contact.save();
  }

  public async getOne(contactId: string): Promise<ContactPg | undefined> {
    return await this.findOne(contactId);
  }
}
