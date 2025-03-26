/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { CreateUserDTO } from "./UserControllerDTO";
import { CreateUserResponse, CreateUserResponseData } from "./UserControllerTRA";
import { UserSerializer } from "./UserControllerSerializer";
import { UserService } from "src/services/UserService";
import { UserRepository } from "src/repositories/UserRepository";
import { generateToken, generateRefreshToken } from "../utils/AuthUtils";

export class UserController {
  private userService: UserService;

  constructor() {
    // Inicializa o serviço com o repositório
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

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

      const existsUser = await this.userService.serviceGetUserByUsername(
        createUserDTO.username
      );

      if (existsUser) {
        return {
          statusCode: 422,
          body: { error: "Usuário já cadastrado" },
        };
      }

      // Chama o serviço para criar o usuário (a criptografia está no serviço)
      const user = await this.userService.serviceCreateUser(createUserDTO);

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

  async getUsers(req: Request): Promise<{
    statusCode: number;
    body: CreateUserResponseData[] | { error: string };
  }> {
    try {
      // Nota: Você precisará adicionar este método ao UserService
      const users = await this.userService.serviceGetUsers();

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

  async getUserById(req: Request): Promise<{
    statusCode: number;
    body: CreateUserResponseData | { error: string };
  }> {
    try {
      const userId = parseInt(req.params.id, 10);
      // Nota: Você precisará adicionar este método ao UserService
      const user = await this.userService.serviceGetUserById(userId);

      if (!user) {
        return {
          statusCode: 404,
          body: { error: "Usuário não encontrado" },
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
        body: { error: "Internal Server Error" },
      };
    }
  }
}
