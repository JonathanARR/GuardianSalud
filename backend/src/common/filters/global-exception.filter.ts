import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { BaseError } from '../errors/base.error';
import { mapPrismaError } from '../errors/prisma-error.mapper';


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {


    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();


    /*
    ==============================
    Convertir errores Prisma
    ==============================
    */

    const mappedException =
      mapPrismaError(exception);



    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Error interno del servidor';

    let error = 'InternalServerError';

    let details: unknown = undefined;



    /*
    ==============================
    Errores propios del dominio
    ==============================
    */

    if (mappedException instanceof BaseError) {

      statusCode =
        mappedException.statusCode;


      message =
        mappedException.message;


      error =
        mappedException.name;


      details =
        mappedException.details;

    }



    /*
    ==============================
    Errores propios de NestJS
    ==============================
    */

    else if (mappedException instanceof HttpException) {


      statusCode =
        mappedException.getStatus();


      const responseException =
        mappedException.getResponse();



      if (
        typeof responseException === 'object'
        &&
        responseException !== null
      ) {


        const res =
          responseException as any;


        message =
          res.message ??
          message;


        error =
          res.error ??
          error;


      } else {

        message =
          responseException.toString();

      }

    }



    /*
    ==============================
    Error desconocido
    ==============================
    */

    else if (mappedException instanceof Error) {


      message =
        mappedException.message;

    }



    /*
    ==============================
    Respuesta estándar API
    ==============================
    */

    response.status(statusCode).json({

      statusCode,

      error,

      message,

      details,

      timestamp:
        new Date().toISOString(),

      path:
        request.url,

    });

  }

}