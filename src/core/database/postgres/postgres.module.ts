import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsPgService } from './contacts/contacts-pg.service';
import * as ORMConfig from 'config/ormConfig';
import { ContactPgRepository } from './contacts/contacts-pg.repository';

const SERVICES = [ContactsPgService];

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    TypeOrmModule.forFeature([ContactPgRepository]),
  ],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class PostgresModule {}
