import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 400, description: 'Credenciales inválidas' })
  @ApiResponse({ status: 403, description: 'Cuenta deshabilitada' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }


  @Get('me')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Obtener usuario autenticado' })
@ApiResponse({
  status: 200,
  description: 'Usuario actual',
})
@ApiResponse({
  status: 401,
  description: 'Token inválido o inexistente',
})
me(
  @CurrentUser('id') userId: string,
) {
  return this.authService.getProfile(userId);
}
}