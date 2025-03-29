// src/controllers/TokenController.ts
import { Request } from "express";
import { UserTokenService } from "src/services/AuthService";
import { LoginDTO, RefreshTokenDTO } from "./AuthControllerDTO";
import {
  CustomError,
  InternalServerError,
  ValidationError,
} from "src/errors/CustomError";

export class UserTokenController {
  constructor(
    private readonly userTokenService: UserTokenService
  ) {}

  async login(req: Request) {
    const { username, password } = req.body;

    // Validação mais robusta
    if (!username || typeof username !== "string") {
      throw new ValidationError(
        "O campo 'username' é obrigatório e deve ser uma string"
      );
    }

    if (!password || typeof password !== "string") {
      throw new ValidationError(
        "O campo 'password' é obrigatório e deve ser uma string"
      );
    }
    const dto: LoginDTO = {
      username: req.body.username,
      password: req.body.password,
    };

    try {
      const tokens = await this.userTokenService.serviceLogin(dto);
      return {
        sucess: true,
        message: "Login efetuado com sucesso",
        statusCode: 200,
        body: tokens,
      };
    } catch (error) {
      // Não encapsule erros customizados em InternalServerError
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError(
        "Ocorreu um erro inesperado no servidor",
        error
      );
    }
  }

  async refreshToken(req: Request) {
    const userToken =
      await this.userTokenService.serviceGetUserIdFromRequest(req);

    if (!userToken) throw new ValidationError("Token inválido ou expirado.");

    const dto: RefreshTokenDTO = {
      refreshToken: req.body.refreshToken,
      updateUserId: userToken,
    };

    try {
      const tokens = await this.userTokenService.serviceRefreshToken(dto);
      return {
        sucess: true,
        message: "Refresh efetuado com sucesso",
        statusCode: 200,
        body: tokens,
      };
    } catch (error) {
      // Não encapsule erros customizados em InternalServerError
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError(
        "Ocorreu um erro inesperado no servidor",
        error
      );
    }
  }

  async logout(req: Request) {
    try {
      await this.userTokenService.serviceLogout(req);
      return {
        sucess: true,
        message: "Logout efetuado com sucesso",
        statusCode: 200,
      };
    } catch (error) {
      // Não encapsule erros customizados em InternalServerError
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError(
        "Ocorreu um erro inesperado no servidor",
        error
      );
    }
  }
}
