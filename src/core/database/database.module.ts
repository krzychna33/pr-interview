import { Module } from '@nestjs/common';
import { ContactsDatabaseService } from './collections/contacts/contacts-database.service';
import { DatabaseService } from './database.service';
import { ContactsPgService } from './postgres/contacts/contacts-pg.service';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  providers: [
    DatabaseService,
    { provide: ContactsDatabaseService, useExisting: ContactsPgService },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
