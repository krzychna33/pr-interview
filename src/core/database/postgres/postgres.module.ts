import { Module } from '@nestjs/common';
import { ContactsPgService } from './contacts/contacts-pg.service';

const SERVICES = [ContactsPgService];

@Module({
  imports: [],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class PostgresModule {}
