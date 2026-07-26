import { BaseError } from './base.error';


export class NotFoundError extends BaseError {


 constructor(
    entity:string,
    id:string,
 ){

    super(
      `${entity} con id ${id} no encontrado`,
      404
    );

 }


}