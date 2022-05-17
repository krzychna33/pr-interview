import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = config.get<string>('server.port');

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
