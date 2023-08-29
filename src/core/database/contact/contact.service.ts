import { ICreateContact } from '@app/core/models/contact.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './contact.entity';

export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  public async getOne(id: string): Promise<ContactEntity | null> {
    return await this.contactRepository.findOne({ where: { id } });
  }

  public async createOne(
    createContact: ICreateContact,
  ): Promise<ContactEntity> {
    const contact = new ContactEntity();

    contact.firstName = createContact.firstName;
    contact.lastName = createContact.lastName;
    contact.age = createContact.age;
    contact.email = createContact.email;

    return await this.contactRepository.save(contact);
  }

  public async createMany(
    createContacts: ICreateContact[],
  ): Promise<ContactEntity[]> {
    const response: ContactEntity[] = [];

    for (const createContact of createContacts) {
      const contact = new ContactEntity();

      contact.firstName = createContact.firstName;
      contact.lastName = createContact.lastName;
      contact.age = createContact.age;
      contact.email = createContact.email;

      const savedData = await this.contactRepository.save(contact);
      response.push(savedData);
    }

    return response;
  }
}
