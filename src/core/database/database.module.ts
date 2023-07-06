import { ContactEntity } from '@app/core/database/contact/contact.entity';
import { ContactService } from '@app/core/database/contact/contact.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import * as ormConfig from 'config/ormConfig';
import * as ormConfigTest from 'config/ormConfigTest';
import { DatabaseService } from './database.service';

const env = config.get('environment');

@Module({
  imports: [
    TypeOrmModule.forRoot(env === 'test' ? ormConfigTest : ormConfig),
    TypeOrmModule.forFeature([ContactEntity]),
  ],
  providers: [DatabaseService, ContactService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
