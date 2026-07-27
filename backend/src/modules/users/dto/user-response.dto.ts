import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'Identificador único del usuario',
  })
  id: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  full_name: string;

  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Correo electrónico del usuario',
  })
  email: string;

  @ApiProperty({
    example: 'PHYSICIAN',
    description: 'Rol del usuario',
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario está activo',
  })
  is_active: boolean;
}
