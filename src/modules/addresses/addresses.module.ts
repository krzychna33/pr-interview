import { DatabaseModule } from '@app/core/database/database.module';
import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
