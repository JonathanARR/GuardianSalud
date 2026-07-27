import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { DuplicateError } from '../../common/errors/duplicate.error';
import { NotFoundError } from '../../common/errors/not-found.error';
import { mapPrismaError } from '../../common/errors/prisma-error.mapper';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const emailExists = await this.usersRepository.existsByEmail(dto.email);

    if (emailExists) {
      throw new DuplicateError('El email ya está registrado', { fields: ['email'] });
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    try {
      const user = await this.usersRepository.create({
        fullName: dto.full_name,
        email: dto.email,
        passwordHash,
        role: dto.role,
        ...(dto.is_active !== undefined && { isActive: dto.is_active }),
      });

      return this.toResponse(user);
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => this.toResponse(user));
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError('Usuario', id);
    }

    return this.toResponse(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundError('Usuario', id);
    }

    if (dto.email && dto.email !== existingUser.email) {
      const emailExists = await this.usersRepository.existsByEmail(dto.email);

      if (emailExists) {
        throw new DuplicateError('El email ya está registrado', { fields: ['email'] });
      }
    }

    const updateData: Record<string, unknown> = {};

    if (dto.full_name !== undefined) {
      updateData.fullName = dto.full_name;
    }

    if (dto.email !== undefined) {
      updateData.email = dto.email;
    }

    if (dto.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    if (dto.role !== undefined) {
      updateData.role = dto.role;
    }

    if (dto.is_active !== undefined) {
      updateData.isActive = dto.is_active;
    }

    try {
      const user = await this.usersRepository.update(id, updateData);
      return this.toResponse(user);
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  async delete(id: string): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundError('Usuario', id);
    }

    try {
      const user = await this.usersRepository.delete(id);
      return this.toResponse(user);
    } catch (error) {
      throw mapPrismaError(error);
    }
  }

  private toResponse(user: User): UserResponseDto {
    const response = new UserResponseDto();
    response.id = user.id;
    response.full_name = user.fullName;
    response.email = user.email;
    response.role = user.role;
    response.is_active = user.isActive;
    return response;
  }
}
