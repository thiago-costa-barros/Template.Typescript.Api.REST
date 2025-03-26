/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { addDays, addMinutes } from "date-fns";
import { UserTokenStatus, UserTokenType } from "src/utils/PublicEnum";
import { UserRepository } from "../repositories/UserRepository";
import { UserTokenRepository } from "src/repositories/AuthRepository";
import {
  GenerateTokenDTO,
  LoginDTO,
  RefreshTokenDTO,
  VerifyTokenDTO,
} from "src/controllers/AuthControllerDTO";

export class UserTokenService {
  constructor(
    private readonly userTokenRepository: UserTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtConfig = {
      SECRET: process.env.JWT_SECRET || "default_secret",
      REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      ACCESS_EXPIRES_MINUTES: 360,
      REFRESH_EXPIRES_DAYS: 7,
    }
  ) {}

  async serviceGenerateAccessToken(
    dto: GenerateTokenDTO
  ): Promise<{ token: string;jwtToken: string; expiresAt: Date }> {
    const expiresAt = addMinutes(
      new Date(),
      this.jwtConfig.ACCESS_EXPIRES_MINUTES
    );
    const jwtToken = jwt.sign(
      { userId: dto.userId, type: UserTokenType.AccessToken },
      this.jwtConfig.SECRET,
      { expiresIn: `${this.jwtConfig.ACCESS_EXPIRES_MINUTES}m` }
    );
    const token = await bcrypt.hash(jwtToken, 10);
    return { token, jwtToken, expiresAt };
  }

  async serviceGenerateRefreshToken(
    dto: GenerateTokenDTO
  ): Promise<{ token: string;jwtToken: string; expiresAt: Date }> {
    const expiresAt = addDays(new Date(), this.jwtConfig.REFRESH_EXPIRES_DAYS);
    const jwtToken = jwt.sign(
      { userId: dto.userId, type: UserTokenType.RefreshToken },
      this.jwtConfig.REFRESH_SECRET,
      { expiresIn: `${this.jwtConfig.REFRESH_EXPIRES_DAYS}d` }
    );
    const token = await bcrypt.hash(jwtToken, 10);
    return { token, jwtToken, expiresAt };
  }

  async serviceVerifyToken(
    dto: VerifyTokenDTO
  ): Promise<{ userId: number} | null> {
    try {
      const secret = dto.isRefresh
        ? this.jwtConfig.REFRESH_SECRET
        : this.jwtConfig.SECRET;
      const decoded = jwt.verify(dto.token, secret) as {
        userId: number;
        type: number;
      };
      return decoded;
    } catch {
      return null;
    }
  }

  async serviceLogin(dto: LoginDTO) {
    const user = await this.userRepository.getUserByUsername(dto.username);

    if (!user) throw new Error("Credenciais inválidas");

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new Error("Credenciais inválidas");

    const accessToken = await this.serviceGenerateAccessToken({
      userId: user.id,
    });
    const refreshToken = await this.serviceGenerateRefreshToken({
      userId: user.id,
    });

    await this.userTokenRepository.createUserToken({
        userId: user.id,
        token: accessToken.jwtToken,
        type: UserTokenType.AccessToken,
        status: UserTokenStatus.Active,
        expiresAt: accessToken.expiresAt,
        creationUserId: user.id,
      });

    await this.userTokenRepository.createUserToken({
        userId: user.id,
        token: refreshToken.token,
        type: UserTokenType.RefreshToken,
        status: UserTokenStatus.Active,
        expiresAt: refreshToken.expiresAt,
        creationUserId: user.id,
      });

    return {
      accessToken: accessToken.jwtToken,
      refreshToken: refreshToken.token,
      expiresIn: this.jwtConfig.ACCESS_EXPIRES_MINUTES * 60, // em segundos
      userId: user.id,
    };
  }

  async serviceRefreshToken(dto: RefreshTokenDTO) {
    const decoded = await this.serviceVerifyToken({
      token: dto.refreshToken,
      isRefresh: true,
    });

    if (!decoded) throw new Error("RefreshToken inválido");

    const tokenEntity = await this.userTokenRepository.findValidToken({
      userId: decoded.userId,
      token: dto.refreshToken,
      type: UserTokenType.RefreshToken,
      status: UserTokenStatus.Active,
      revokedAt: null,
    });

    if (!tokenEntity)
      throw new Error("RefreshToken não encontrado ou revogado");

    await this.userTokenRepository.revokeToken({
      tokenId: tokenEntity.id,
      status: UserTokenStatus.Inactive,
      updateUserId: dto.updateUserId,
    });

    const accessToken = await this.serviceGenerateAccessToken({
      userId: decoded.userId,
    });
    const newRefreshToken = await this.serviceGenerateRefreshToken({
      userId: decoded.userId,
    });

    await this.userTokenRepository.createUserToken({
      userId: decoded.userId,
      token: newRefreshToken.token,
      type: UserTokenType.RefreshToken,
      status: UserTokenStatus.Active,
      expiresAt: newRefreshToken.expiresAt,
      creationUserId: dto.updateUserId,
    });

    return {
      accessToken: accessToken.jwtToken,
      refreshToken: newRefreshToken.token,
      expiresIn: this.jwtConfig.ACCESS_EXPIRES_MINUTES,
      userId: decoded.userId,
    };
  }

  async serviceLogout(req: Request) {
    const userId = await this.serviceGetUserIdFromRequest(req);
    if (!userId) {
      return null; // Token não fornecido
    }
    await this.userTokenRepository.revokeAllActiveAcessTokens({
      userId: userId,
      statusActive: UserTokenStatus.Active,
      statusInactive: UserTokenStatus.Inactive,
      type: UserTokenType.AccessToken,
    })

    await this.userTokenRepository.revokeAllActiveRefreshTokens({
      userId: userId,
      statusActive: UserTokenStatus.Active,
      statusInactive: UserTokenStatus.Inactive,
      type: UserTokenType.RefreshToken,
    });
  }
  async serviceGetUserIdFromRequest(req: Request) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    //console.log("Token recebido:", token);
    if (!token) {
      return null; // Token não fornecido
    }
  
    try {
      const decoded = jwt.verify(token, this.jwtConfig.SECRET) as { userId: number };
      return decoded.userId; // Retorna o userId do token
    } catch (error) {
      return null; // Token inválido ou expirado
    }
  }
}
