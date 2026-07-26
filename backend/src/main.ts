import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupCors } from './config/cors.config';
import { setupSwagger } from './config/swagger.config';
import { setupValidation } from './config/validation.config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  setupCors(app, configService);
  setupValidation(app);
  setupSwagger(app);


  app.useGlobalFilters(
    new GlobalExceptionFilter()
  );

  await app.listen(port);

}

bootstrap();