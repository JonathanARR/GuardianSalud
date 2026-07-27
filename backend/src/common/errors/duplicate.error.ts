import { BaseError } from './base.error';

export class DuplicateError extends BaseError {

  constructor(
    message = 'El registro ya existe',
    details?: unknown,
  ) {

    super(
      message,
      409,
      details,
    );

  }

}