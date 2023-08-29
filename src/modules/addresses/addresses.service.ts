import { ControllerService } from '@app/core/utilities/controller.service';
import { DatabaseService } from '@app/core/database/database.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseAddress } from './addresses.dto';
import { IAddress } from '@core/models/address.model';

@Injectable()
export class AddressesService extends ControllerService<
  ResponseAddress,
  IAddress
> {
  constructor(private readonly databaseService: DatabaseService) {
    super(ResponseAddress);
  }

  public createManyAddress(createDtos: any): Observable<ResponseAddress[]> {
    return this.databaseService
      .addressesCreateMany(createDtos.addresses)
      .pipe(
        map((addresses) => addresses.map((address) => this.dtoMapper(address))),
      );
  }
}
