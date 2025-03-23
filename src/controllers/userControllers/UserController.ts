/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { CreateUserDTO } from "./UserControllerDTO";
import { CreateUserResponse } from "./UserControllerTRA";
import { CreateUserResponseData } from "./UserControllerTRA";
import { UserSerializer } from "./UserControllerSerializer";
import { UserRepository } from "src/repositories/userRepositories/UserRepository";
import { ICreateUserRepository } from "src/repositories/userRepositories/protocols";
import { IGetUsersRepository } from "src/repositories/userRepositories/protocols";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "../../utils/AuthUtils";

export class UserController {
  private createUserRepository: ICreateUserRepository;
  private getUsersRepository: IGetUsersRepository;

  constructor() {
    // Inicializa os repositórios com a instância global do Prisma
    this.createUserRepository = new UserRepository();
    this.getUsersRepository = new UserRepository();
  }

  // Método para criar um usuário
  async createUser(req: Request): Promise<{
    statusCode: number;
    body: CreateUserResponse | { error: string; missingFields?: string[] };
  }> {
    try {
      const { username, email, firstname, lastname, password } = req.body;

      // Validação dos campos obrigatórios
      const missingFields: string[] = [];
      if (!username) missingFields.push("username");
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");

      if (missingFields.length > 0) {
        return {
          statusCode: 400,
          body: { error: "Fields are required", missingFields },
        };
      }

      // Cria o DTO
      const createUserDTO: CreateUserDTO = {
        username,
        email,
        firstname,
        lastname,
        password,
      };

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário no banco de dados
      const user = await this.createUserRepository.createUser({
        ...createUserDTO,
        password: hashedPassword,
      });

      // Serializa o usuário para a resposta
      const serializedUser = UserSerializer.serialize(user);

      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      return {
        statusCode: 201,
        body: {
          user: serializedUser,
          tokens: { token, refreshToken },
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      };
    }
  }

  // Método para listar usuários
  async getUsers(req: Request): Promise<{
    statusCode: number;
    body: CreateUserResponseData[] | { error: string };
  }> {
    try {
      const users = await this.getUsersRepository.getUsers();

      // Serializa cada usuário para a resposta
      const serializedUsers = users.map((user) =>
        UserSerializer.serialize(user)
      );

      return {
        statusCode: 200,
        body: serializedUsers,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      };
    }
  }

  // Método para listar dados do usuário autenticado
  async getUserById(
    req: Request
  ): Promise<{ statusCode: number; body: CreateUserResponseData | { error: string } }> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.getUsersRepository.getUserById(userId);
  
      if (!user) {
        return {
          statusCode: 404,
          body: { error: 'Usuário não encontrado' },
        };
      }
  
      const serializedUser = UserSerializer.serialize(user);
      return {
        statusCode: 200,
        body: serializedUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  }
}

