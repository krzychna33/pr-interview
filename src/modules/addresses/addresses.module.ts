import { DatabaseModule } from '@app/core/database/database.module';
import { Module } from '@nestjs/common';
import { ContactsAddressesController } from './contacts-addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsAddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
