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
import {
  CustomError,
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError,
  ValidationError,
} from "src/errors/CustomError";

export class UserController {
  private userService: UserService;
  private userTokenService: UserTokenService;

  constructor() {
    // Inicializa o serviço com o repositório
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
    const userTokenRepository = new UserTokenRepository();
    this.userTokenService = new UserTokenService(
      userTokenRepository,
      userRepository
    );
  }

  async createUser(req: Request) {
    try {
      const { username, email, firstname, lastname, password } = req.body;

      // Validação dos campos obrigatórios
      const missingFields: string[] = [];
      if (!username) missingFields.push("username");
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");

      if (missingFields.length > 0) {
        throw new ValidationError("Campos obrigatórios faltando", {
          error: "Campos obrigatórios faltantes",
          missingFields,
        });
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
        throw new UnprocessableEntityError("Usuário já existe");
      }

      // Chama o serviço para criar o usuário (a criptografia está no serviço)
      const user = await this.userService.serviceCreateUser(createUserDTO);

      const token = await this.userTokenService.serviceGenerateAccessToken({
        userId: user.id,
      });
      const refreshToken =
        await this.userTokenService.serviceGenerateRefreshToken({
          userId: user.id,
        });

      const serializedTokens: AuthTokens = {
        token: token.jwtToken,
        refreshToken: refreshToken.jwtToken,
        expiresAt: token.expiresAt,
      };

      // Serializa o usuário para a resposta
      const serializedResponse = UserSerializer.serializerCreateUser(
        user,
        serializedTokens
      );

      return {
        sucess: true,
        message: "Usuário Criado com sucesso",
        statusCode: 201,
        body: serializedResponse,
      };
    } catch (error) {
      // Não encapsule erros customizados em InternalServerError
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError("Ocorreu um erro inesperado no servidor", error);
    }
  }

  async getUsers(req: Request) {
    try {
      // Nota: Você precisará adicionar este método ao UserService
      const users = await this.userService.serviceGetUsers();

      const serializedUsers = users.map((user) =>
        UserSerializer.serializerGetUser(user)
      );

      return {
        sucess: true,
        statusCode: 200,
        body: serializedUsers,
      };
    } catch (error) {
      throw new InternalServerError(
        "Ocorreu um erro inesperado no servidor",
        error
      );
    }
  }

  async getUserById(req: Request) {
    try {
      const userId = parseInt(req.params.id, 10);
      // Nota: Você precisará adicionar este método ao UserService
      const user = await this.userService.serviceGetUserById(userId);

      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }

      const serializedUser = UserSerializer.serializerGetUser(user);
      return {
        sucess: true,
        statusCode: 200,
        body: serializedUser,
      };
    } catch (error) {
      throw new InternalServerError(
        "Ocorreu um erro inesperado no servidor",
        error
      );
    }
  }
}
