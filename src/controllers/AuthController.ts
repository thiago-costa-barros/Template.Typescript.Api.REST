// src/controllers/TokenController.ts
import { Request } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserTokenService } from "src/services/AuthService";
import { UserTokenRepository } from "src/repositories/AuthRepository";
import { LoginDTO, RefreshTokenDTO } from "./AuthControllerDTO";

export class UserTokenController {
  private userTokenService: UserTokenService;
  private userRepository: UserRepository;

  constructor() {
    const userTokenRepository = new UserTokenRepository();
    const userRepository = new UserRepository();
    this.userTokenService = new UserTokenService(userTokenRepository, userRepository);
    this.userRepository = new UserRepository();
  }

  async login(req: Request) {
    const dto: LoginDTO = {
      username: req.body.username,
      password: req.body.password
    };

    try {
      const tokens = await this.userTokenService.serviceLogin(dto);
      return {
        statusCode: 200,
        body: tokens
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: { error: error }
      };
    }
  }

  async refreshToken(req: Request) {
    const userToken = await this.userTokenService.serviceGetUserIdFromRequest(req);

    if(!userToken){
      throw new Error('Token inválido ou expirado.');
    }
    const dto: RefreshTokenDTO = {
      refreshToken: req.body.refreshToken,
      updateUserId: userToken,
    };

    try {
      const tokens = await this.userTokenService.serviceRefreshToken(dto);
      return {
        statusCode: 200,
        body: tokens
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: { error: error }
      };
    }
  }

  async logout(req: Request) {

    try {
      await this.userTokenService.serviceLogout(req);
      return {
        statusCode: 200,
        body: { message: "Logout efetuado com sucesso" }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: error }
      };
    }
  }
}