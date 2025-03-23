import {User} from '@prisma/client'
import { Request } from 'express';

// Interface para o Controller
export interface IGetUsersController {
    handle(req: Request): Promise<{ statusCode: number; body: User[] | { error: string } }>;
}

// Interface para o Repositório
export interface IGetUsersRepository {
    getUsers(): Promise<User[]>;
}