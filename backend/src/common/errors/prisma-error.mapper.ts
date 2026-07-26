import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library';

import { DuplicateError } from './duplicate.error';
import { NotFoundError } from './not-found.error';
import { DatabaseError } from './database.error';


export function mapPrismaError(
  error: unknown,
): Error {


  /*
  ==============================
  Registro duplicado
  ==============================

  Prisma:
  P2002
  */

  if (
    error instanceof PrismaClientKnownRequestError
    &&
    error.code === 'P2002'
  ) {


    const fields =
      error.meta?.target as string[] | undefined;


    return new DuplicateError(
      'El registro ya existe',
      {
        fields,
      },
    );

  }



  /*
  ==============================
  Registro no encontrado
  ==============================

  Prisma:
  P2025
  */

  if (
    error instanceof PrismaClientKnownRequestError
    &&
    error.code === 'P2025'
  ) {


    return new NotFoundError(
      'Registro',
      'desconocido',
    );

  }



  /*
  ==============================
  Foreign Key
  ==============================

  Prisma:
  P2003
  */

  if (
    error instanceof PrismaClientKnownRequestError
    &&
    error.code === 'P2003'
  ) {


    const field =
      error.meta?.field_name as string | undefined;


    return new DatabaseError(
      'Violación de relación entre registros',
      {
        field,
      },
    );

  }



  /*
  ==============================
  Error conexión DB
  ==============================
  */

  if (
    error instanceof PrismaClientInitializationError
  ) {


    return new DatabaseError(
      'No se pudo conectar con la base de datos',
    );

  }



  /*
  ==============================
  Otros errores Prisma
  ==============================
  */

  if (
    error instanceof PrismaClientKnownRequestError
  ) {


    return new DatabaseError(
      'Error ejecutando operación de base de datos',
      {
        code: error.code,
      },
    );

  }



  /*
  ==============================
  No es Prisma
  ==============================
  */

  return error instanceof Error
    ? error
    : new Error('Error desconocido');

}