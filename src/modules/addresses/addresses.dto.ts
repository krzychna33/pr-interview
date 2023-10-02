import { ArrayNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ICreateAddress } from '@core/models/address.model';

export class CreateAddressDto implements ICreateAddress {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;
}

export class ResponseAddressDto {
  @Expose()
  id: string;

  @Expose()
  address: string;

  @Expose()
  city: string;

  @Expose()
  postalCode: string;
}

export class CreateManyAddressesDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: ICreateAddress[];
}
