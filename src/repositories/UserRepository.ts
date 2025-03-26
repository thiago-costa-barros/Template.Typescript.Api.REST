import { User } from "@prisma/client";
import { CreateUserDTO } from "../controllers/UserControllerDTO";
import { prisma } from "@lib/prisma";
import bcrypt from "bcryptjs";

export class UserRepository {
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

  async getUserByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username: username, deletionDate: null },
    });
  }

  async getOrCreateHandlerUser(
    handlerName: string,
    defaults: {
      firstname: string;
      lastname: string;
      password: string;
      isStaff: boolean;
    }
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(defaults.password, 10);

    return prisma.user.upsert({
      where: { username: handlerName },
      update: {},
      create: {
        username: handlerName,
        firstName: defaults.firstname,
        lastName: defaults.lastname,
        password: hashedPassword,
        isStaff: defaults.isStaff,
      },
    });
  }
}
