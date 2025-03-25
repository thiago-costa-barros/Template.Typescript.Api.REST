import { User } from "@prisma/client";
import { Request } from "express";

// Interface para o Controller
export interface IGetUsersController {
  getUsers(
    req: Request
  ): Promise<{ statusCode: number; body: User[] | { error: string } }>;
  getUserById(userId: number): Promise<{ statusCode: number; body: User | { error: string } }>;
}

export interface ICreateUserController {
  createUser(req: Request): Promise<{
    statusCode: number;
    body: User | { error: string; missingFields?: string[] };
  }>;
}
