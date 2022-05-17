import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactPgRepository } from './contacts/contacts-pg.repository';
import { ContactsPgService } from './contacts/contacts-pg.service';
import * as ormConfigTest from 'config/ormConfigTest';
import * as ormConfig from 'config/ormConfig';
import * as config from 'config';

const SERVICES = [ContactsPgService];
const env = config.get('environment');

@Module({
  imports: [
    TypeOrmModule.forRoot(env === 'test' ? ormConfigTest : ormConfig),
    TypeOrmModule.forFeature([ContactPgRepository]),
  ],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class PostgresModule {}
