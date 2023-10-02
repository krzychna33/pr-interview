import { DatabaseModule } from '@app/core/database/database.module';
import { Module } from '@nestjs/common';
import { ContactAddressesController } from './contactAddressesController';
import { AddressesService } from './addresses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactAddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
