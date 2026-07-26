import { BaseError } from './base.error';


export class DatabaseError extends BaseError {


constructor(
 message='Error interno de base de datos',
 details?:unknown
){

super(
 message,
 500,
 details
)

}


}