import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
  load: [
    jwtConfig,
  ],
    }),
  ],
    controllers: [AppController],
})
export class AppModule {}