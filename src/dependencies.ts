import { prisma } from '@lib/prisma';
import { UserRepository } from './repositories/UserRepository';
import { GetUserController } from './controllers/userControllers/getUsersController';

// Instancia o repositório
const userRepository = new UserRepository(prisma);

// Instancia o controller com o repositório injetado
const getUserController = new GetUserController(userRepository);

export const dependencies = {
    userRepository,
    getUserController,
};