import { User } from "@prisma/client";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDTO } from "src/controllers/UserControllerDTO";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async serviceCreateUser(createUserDTO: CreateUserDTO): Promise<User> {
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);

    // Cria o usuário no banco de dados
    const user = await this.userRepository.createUser({
      ...createUserDTO,
      password: hashedPassword,
    });

    return user;
  }

  async serviceGetUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async serviceGetUserById(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async serviceGetUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.getUserByUsername(username);
  }

  async serviceGetOrCreateHandlerUser(handlerName: string): Promise<User> {
    const defaults = {
      firstname: "Process Function",
      lastname: handlerName,
      password: process.env.HANDLER_PASSWORD as string,
      isStaff: true,
    };

    return this.userRepository.getOrCreateHandlerUser(handlerName, defaults);
  }
}
