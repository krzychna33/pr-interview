import {
  IContactDb,
  ICreateContact,
} from '@app/core/database/collections/contacts/contacts-database.models';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateContactDto implements ICreateContact {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsInt() age: number;
  @IsString() email: string;
}

export class CreateManyContactsDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts: ICreateContact[];
}

export class ResponseContactDto {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;

  constructor(contact: IContactDb) {
    this.id = contact.id;
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.age = contact.age;
    this.email = contact.email;
  }
}
