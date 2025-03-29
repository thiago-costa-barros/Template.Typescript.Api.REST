/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erros customizados
  if (err instanceof CustomError) {
    return res.status(err.type.value).json({
      sucess: false,
      message: err.message,
      errorType: err.type.name,
      statusCode: err.type.value,
      responseDate: new Date().toISOString(),
      ...(err.details && { details: err.details }),
    });
  }

  // Erros de validação do Express (como body-parser)
  if (err.name === 'ValidationError' || err.name === 'SyntaxError') {
    return res.status(400).json({
      sucess: false,
      message: "Erro na requisição",
      errorType: "BadRequest",
      statusCode: 400,
      responseDate: new Date().toISOString(),
    });
  }

  // Erros não tratados
  console.error("Unhandled error:", err);
  
  return res.status(500).json({
    sucess: false,
    message: "Ocorreu um erro inesperado no servidor",
    errorType: "InternalServerError",
    statusCode: 500,
    responseDate: new Date().toISOString(),
  });
}