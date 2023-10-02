import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from '@database/contact/contact.entity';
import { ContactService } from '@database/contact/contact.service';
import { AddressService } from '@database/address/address.service';
import * as config from 'config';
import * as ormConfig from 'config/ormConfig';
import * as ormConfigTest from 'config/ormConfigTest';
import { DatabaseService } from './database.service';
import { AddressEntity } from '@database/address/address.entity';

const env = config.get('environment');

@Module({
  imports: [
    TypeOrmModule.forRoot(env === 'test' ? ormConfigTest : ormConfig),
    TypeOrmModule.forFeature([ContactEntity, AddressEntity]),
  ],
  providers: [DatabaseService, ContactService, AddressService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
