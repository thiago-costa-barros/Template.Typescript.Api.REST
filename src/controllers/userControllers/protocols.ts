import {User} from '@prisma/client'

// Interface para o Controller
export interface IGetUserController {
    handle(): Promise<{ statusCode: number; body: User[] | { error: string } }>;
}

// Interface para o Repositório
export interface IGetUserRepository {
    getUsers(): Promise<User[]>;
}