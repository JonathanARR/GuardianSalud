import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(
    'password123',
    10,
  );

  await prisma.user.createMany({
    data: [
      {
        fullName: 'Administrador Sistema',
        email: 'admin@guardian.com',
        passwordHash,
        role: 'ADMIN',
        isActive: true,
      },
      {
        fullName: 'Dr. Juan Perez',
        email: 'medico@guardian.com',
        passwordHash,
        role: 'PHYSICIAN',
        isActive: true,
      },
      {
        fullName: 'Maria Enfermera',
        email: 'enfermera@guardian.com',
        passwordHash,
        role: 'NURSE',
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Usuarios creados correctamente');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });