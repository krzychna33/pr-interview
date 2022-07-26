import { ICreateContact } from '@app/core/models/contact.model';
import { Expose, Type } from 'class-transformer';
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

export class ResponseContactDto {
  @Expose() id: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() age: number;
  @Expose() email: string;
}

export class CreateManyContactsDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts: ICreateContact[];
}
