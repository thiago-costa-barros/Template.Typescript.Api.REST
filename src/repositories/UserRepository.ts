import { PrismaClient, User } from '@prisma/client';
import { IGetUserRepository } from '../controllers/userControllers/protocols';

export class UserRepository implements IGetUserRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }
}