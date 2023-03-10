import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { LeasesModule } from './leases.module';

async function bootstrap() {
  const app = await NestFactory.create(LeasesModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
