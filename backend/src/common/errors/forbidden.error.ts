import { BaseError } from './base.error';


export class ForbiddenError extends BaseError {


constructor(
 message='No tiene permisos para realizar esta acción'
){

super(
 message,
 403
)

}

}