import { User } from "@prisma/client";
import { Request } from "express";

// Interface para o Controller
export interface IGetUsersController {
  handle(
    req: Request
  ): Promise<{ statusCode: number; body: User[] | { error: string } }>;
}

export interface ICreateUserController {
  handle(req: Request): Promise<{
    statusCode: number;
    body: User | { error: string; missingFields?: string[] };
  }>;
}

