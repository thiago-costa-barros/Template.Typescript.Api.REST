/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorType } from "../utils/PublicEnum";

export class CustomError extends Error {
  constructor(
    public readonly type: { name: string | null; value: number },
    public readonly message: string,
    public readonly details?: any,
    public readonly response: Date = new Date()
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  toResponse() {
    return {
      sucess: false,
      message: this.message,
      errorType: this.type.name,
      statusCode: this.type.value,
      response: this.response.toISOString(),
      ...(this.details && { details: this.details }),
    };
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.ValidationError, message, details);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.Unauthorized, message, details);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.Forbidden, message, details);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.NotFound, message, details);
  }
}

export class MethodNotAllowedError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.MethodNotAllowed, message, details);
  }
}


export class ConflictError extends CustomError {
    constructor(message: string, details?: any) {
        super(ErrorType.Conflict, message, details);
    }
}

export class UnprocessableEntityError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.UnprocessableEntity, message, details);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.InternalServerError, message, details);
  }
}

export class ServiceUnavailableError extends CustomError {
  constructor(message: string, details?: any) {
    super(ErrorType.ServiceUnavailable, message, details);
  }
}