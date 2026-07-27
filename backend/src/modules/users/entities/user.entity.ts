import { Role } from '@prisma/client';

export class UserEntity {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  is_active: boolean;
}
