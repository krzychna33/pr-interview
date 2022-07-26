import { Module } from '@nestjs/common';
import * as ormConfigTest from 'config/ormConfigTest';
import * as ormConfig from 'config/ormConfig';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRepository } from './contacts/contacts.repository';
import { DatabaseService } from './database.service';

const env = config.get('environment');

@Module({
  imports: [
    TypeOrmModule.forRoot(env === 'test' ? ormConfigTest : ormConfig),
    TypeOrmModule.forFeature([ContactRepository]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
