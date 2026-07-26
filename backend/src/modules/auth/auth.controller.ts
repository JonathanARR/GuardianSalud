import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 400, description: 'Credenciales inválidas' })
  @ApiResponse({ status: 403, description: 'Cuenta deshabilitada' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
