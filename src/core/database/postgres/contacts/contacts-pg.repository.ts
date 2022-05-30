import { EntityRepository, Repository } from 'typeorm';
import { ICreateContact } from '../../collections/contacts/contacts-database.models';
import { ContactPg } from './contacts-pg.entity';

@EntityRepository(ContactPg)
export class ContactPgRepository extends Repository<ContactPg> {
  public async getOne(contactId: string): Promise<ContactPg | undefined> {
    return await this.findOne(contactId);
  }

  public async createOne(createContact: ICreateContact): Promise<ContactPg> {
    const contact = new ContactPg();

    contact.first_name = createContact.firstName;
    contact.last_name = createContact.lastName;
    contact.age = createContact.age;
    contact.email = createContact.email;

    contact.created_date = new Date();
    contact.updated_date = new Date();

    return await contact.save();
  }

  public async createMany(
    createContacts: ICreateContact[],
  ): Promise<ContactPg[]> {
    const response: ContactPg[] = [];

    for (const createContact of createContacts) {
      const contact = new ContactPg();

      contact.first_name = createContact.firstName;
      contact.last_name = createContact.lastName;
      contact.age = createContact.age;
      contact.email = createContact.email;

      contact.created_date = new Date();
      contact.updated_date = new Date();

      const savedData = await contact.save();
      response.push(savedData);
    }

    return response;
  }

  public async deleteAll(ids: string[]): Promise<unknown> {
    return this.delete(ids);
  }
}
