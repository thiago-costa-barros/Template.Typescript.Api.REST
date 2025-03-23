/* eslint-disable @typescript-eslint/no-unused-vars */
import {User} from '@prisma/client'
import { Request } from 'express';

// Interface para o Controller
export interface IGetUserController {
    handle(req: Request): Promise<{ statusCode: number; body: User[] | { error: string } }>;
}

// Interface para o Repositório
export interface IGetUserRepository {
    getUsers(): Promise<User[]>;
}