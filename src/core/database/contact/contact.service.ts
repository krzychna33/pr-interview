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
    return await this.contactRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
  }

  public async createOne(
    createContact: ICreateContact,
  ): Promise<ContactEntity> {
    const contact = new ContactEntity();

    contact.firstName = createContact.firstName;
    contact.lastName = createContact.lastName;
    contact.age = createContact.age;
    contact.email = createContact.email;
    contact.phoneNumber = createContact.phoneNumber;

    return await this.contactRepository.save(contact);
  }

  public async createMany(
    createContacts: ICreateContact[],
  ): Promise<ContactEntity[]> {
    // I changed method of inserting data to database
    // Instead inserting contacts one by one i am doing it in one single batch
    // this is faster

    const contactsToInsert = createContacts.map((createContact) => {
      const newContact = new ContactEntity();

      newContact.firstName = createContact.firstName;
      newContact.lastName = createContact.lastName;
      newContact.age = createContact.age;
      newContact.email = createContact.email;
      newContact.phoneNumber = createContact.phoneNumber;

      return newContact;
    });

    const response = await this.contactRepository.save(contactsToInsert);

    return response;
  }
}
