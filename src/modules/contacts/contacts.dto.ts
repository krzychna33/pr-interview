import { ICreateContact } from '@app/core/models/contact.model';
import { Expose, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsInt,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ResponseAddressDto } from '@app/modules/addresses/addresses.dto';

export class CreateContactDto implements ICreateContact {
  @IsString() firstName: string;

  @IsString() lastName: string;

  @IsInt() age: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;
}

export class ResponseContactDto {
  @Expose() id: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() age: number;
  @Expose() email: string;
  @Expose() phoneNumber: string;

  @Expose()
  @Type(() => ResponseAddressDto)
  addresses?: ResponseAddressDto[];
}

export class CreateManyContactsDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts: ICreateContact[];
}
