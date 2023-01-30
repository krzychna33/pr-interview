import { ICreateContact } from '@app/core/models/contact.model';
import { EntityRepository, Repository } from 'typeorm';
import { ContactEntity } from './contacts.entity';

@EntityRepository(ContactEntity)
export class ContactRepository extends Repository<ContactEntity> {
  public async getOne(contactId: string): Promise<ContactEntity | undefined> {
    return await this.findOne(contactId);
  }

  public async createOne(
    createContact: ICreateContact,
  ): Promise<ContactEntity> {
    const contact = new ContactEntity();

    contact.firstName = createContact.firstName;
    contact.lastName = createContact.lastName;
    contact.age = createContact.age;
    contact.email = createContact.email;

    return await this.save(contact);
  }

  public async createMany(
    createContacts: ICreateContact[],
  ): Promise<ContactEntity[]> {
    const response: ContactEntity[] = [];

    for (const createContact of createContacts) {
      const contact = new ContactEntity();

      const nowDate = new Date();
      contact.createdDate = nowDate;
      contact.updatedDate = nowDate;

      contact.firstName = createContact.firstName;
      contact.lastName = createContact.lastName;
      contact.age = createContact.age;
      contact.email = createContact.email;

      const savedData = await this.save(contact);
      response.push(savedData);
    }

    return response;
  }
}
