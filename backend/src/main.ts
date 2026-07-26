import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupCors } from './config/cors.config';
import { setupSwagger } from './config/swagger.config';
import { setupValidation } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  setupCors(app, configService);
  setupValidation(app);
  setupSwagger(app);

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port);
}

bootstrap();