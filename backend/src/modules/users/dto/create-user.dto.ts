import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no debe exceder 100 caracteres' })
  full_name: string;

  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Correo electrónico del usuario',
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @MaxLength(150, { message: 'El email no debe exceder 150 caracteres' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @ApiProperty({
    example: 'PHYSICIAN',
    description: 'Rol del usuario',
    enum: Role,
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsEnum(Role, { message: 'El rol debe ser ADMIN, PHYSICIAN o NURSE' })
  role: Role;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario está activo',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo is_active debe ser un valor booleano' })
  is_active?: boolean;
}
