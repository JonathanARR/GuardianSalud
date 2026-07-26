import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { InvalidFieldError } from '../../common/errors/invalid-field.error';
import { ForbiddenError } from '../../common/errors/forbidden.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new InvalidFieldError('credentials', 'Email o contraseña incorrectos');
    }

    if (!user.isActive) {
      throw new ForbiddenError('La cuenta está deshabilitada');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new InvalidFieldError('credentials', 'Email o contraseña incorrectos');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }
}
