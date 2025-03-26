/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { CreateUserDTO } from "./UserControllerDTO";
import { CreateUserResponse, GetUserResponseData } from "./UserControllerTRA";
import { UserSerializer } from "./UserControllerSerializer";
import { UserService } from "src/services/UserService";
import { UserRepository } from "src/repositories/UserRepository";
import { UserTokenService } from "src/services/AuthService";
import { UserTokenRepository } from "src/repositories/AuthRepository";
import { AuthTokens } from "./AuthControllerTRA";

export class UserController {
  private userService: UserService;
  private userTokenService: UserTokenService;

  constructor() {
    // Inicializa o serviço com o repositório
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
    const userTokenRepository = new UserTokenRepository();
    this.userTokenService = new UserTokenService(userTokenRepository, userRepository);
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

      const token = await this.userTokenService.serviceGenerateAccessToken({userId: user.id});
      const refreshToken = await this.userTokenService.serviceGenerateRefreshToken({userId: user.id});

      const serializedTokens: AuthTokens = {
        token: token.jwtToken,
        refreshToken: refreshToken.jwtToken,
        expiresAt: token.expiresAt
      }

      // Serializa o usuário para a resposta
      const serializedResponse = UserSerializer.serializerCreateUser(user,serializedTokens);

      return {
        statusCode: 201,
        body: serializedResponse,
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
    body: GetUserResponseData[] | { error: string };
  }> {
    try {
      // Nota: Você precisará adicionar este método ao UserService
      const users = await this.userService.serviceGetUsers();

      const serializedUsers = users.map((user) =>
        UserSerializer.serializerGetUser(user)
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
    body: GetUserResponseData | { error: string };
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

      const serializedUser = UserSerializer.serializerGetUser(user);
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
