import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const ORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.get('database.postgres.host'),
  port: config.get('database.postgres.port'),
  username: config.get('database.postgres.username'),
  password: config.get('database.postgres.password'),
  database: config.get('database.postgres.database'),
  entities: ['dist/src/**/*.entity.{ts,js}'],
  synchronize: true,
  keepConnectionAlive: true,
  logging: true,
};

module.exports = ORMConfig;
