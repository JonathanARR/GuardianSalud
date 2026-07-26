import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupCors(
  app: INestApplication,
  configService: ConfigService,
): void {
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL')?.split(',') ?? [],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}