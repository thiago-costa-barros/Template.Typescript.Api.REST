import { User } from '@prisma/client';
import { CreateUserDTO } from '../../controllers/userControllers/UserControllerDTO';
import { prisma } from '@lib/prisma';
import { ICreateUserRepository, IGetUsersRepository } from './protocols';

export class UserRepository implements ICreateUserRepository, IGetUsersRepository {
  // Cria um usuário
  async createUser(userData: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        firstName: userData.firstname,
        lastName: userData.lastname,
        password: userData.password,
      },
    });
    return user;
  }

  // Lista todos os usuários
  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  // Lista dados do usuário autenticado
  async getUserById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }
}