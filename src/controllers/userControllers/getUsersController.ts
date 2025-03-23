/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import { Request } from 'express';
import { IGetUsersController } from './protocols';
import { IGetUsersRepository } from './protocols';

export class GetUsersController implements IGetUsersController {
    constructor(private readonly getUserRepository: IGetUsersRepository) {}

    async handle(req: Request): Promise<{ statusCode: number; body: User[] | { error: string } }> {
        try {
            const users = await this.getUserRepository.getUsers();
            return {
                statusCode: 200,
                body: users,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: { error: 'Internal Server Error' },
            };
        }
    }
}