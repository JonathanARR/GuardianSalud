import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      name: 'Guardian Salud API',
      version: '1.0.0',
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}