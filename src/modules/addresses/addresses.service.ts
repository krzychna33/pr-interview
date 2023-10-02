import { ControllerService } from '@app/core/utilities/controller.service';
import { DatabaseService } from '@app/core/database/database.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAddress } from '@core/models/address.model';
import {
  CreateManyAddressesDto,
  ResponseAddressDto,
} from '@app/modules/addresses/addresses.dto';

@Injectable()
export class AddressesService extends ControllerService<
  ResponseAddressDto,
  IAddress
> {
  constructor(private readonly databaseService: DatabaseService) {
    super(ResponseAddressDto);
  }

  public createManyAddress(
    createDtos: CreateManyAddressesDto,
    contactId: string,
  ): Observable<ResponseAddressDto[]> {
    return this.databaseService
      .addressesCreateMany(createDtos.addresses, contactId)
      .pipe(
        map((addresses) => addresses.map((address) => this.dtoMapper(address))),
      );
  }
}
