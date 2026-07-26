import { BaseError } from './base.error';


export class InvalidFieldError extends BaseError {


constructor(
 field:string,
 message:string
){

 super(
   `Campo inválido: ${field}. ${message}`,
   400
 );

}


}