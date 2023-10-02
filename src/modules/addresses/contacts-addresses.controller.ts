import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { Observable } from 'rxjs';
import {
  CreateManyAddressesDto,
  ResponseAddressDto,
} from '@app/modules/addresses/addresses.dto';

@Controller('contacts/:contactId/addresses')
export class ContactsAddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post('many')
  createAddresses(
    @Body(ValidationPipe) createAddressesDto: CreateManyAddressesDto,
    @Param('contactId') contactId: string,
  ): Observable<ResponseAddressDto[]> {
    return this.addressesService.createManyAddress(
      createAddressesDto,
      contactId,
    );
  }
}
