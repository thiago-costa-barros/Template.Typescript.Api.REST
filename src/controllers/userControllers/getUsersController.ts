import { User } from '@prisma/client';
import { IGetUserController } from './protocols';
import { IGetUserRepository } from './protocols';

export class GetUserController implements IGetUserController {
    constructor(private readonly getUserRepository: IGetUserRepository) {}

    async handle(): Promise<{ statusCode: number; body: User[] | { error: string } }> {
        try {
            const users = await this.getUserRepository.getUsers();
            return {
                statusCode: 200,
                body: users,
            };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return {
                statusCode: 500,
                body: { error: 'Internal Server Error' },
            };
        }
    }
}