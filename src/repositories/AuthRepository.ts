import { prisma } from "@lib/prisma";
import { UserToken } from "@prisma/client";

export class UserTokenRepository {
  async createUserToken(tokenData: {
    userId: number;
    token: string;
    type: number;
    status: number;
    expiresAt: Date;
    creationUserId: number;
  }): Promise<UserToken> {
    return prisma.userToken.create({
      data: {
        userId: tokenData.userId,
        token: tokenData.token,
        type: tokenData.type,
        expiresAt: tokenData.expiresAt,
        creationUserId: tokenData.creationUserId,
        status: tokenData.status,
      },
    });
  }

  async findValidToken(tokenData: {
    userId: number;
    type: number;
    status: number;
    revokedAt: null;
  }): Promise<UserToken | null> {
    return prisma.userToken.findFirst({
      where: {
        ...tokenData,
        deletionDate: null,
        expiresAt: { gt: new Date() },
      },
    });
  }

  async getValidTokenByUserId(tokenData: {
    userId: number;
    type: number;
    status: number;
  }): Promise<UserToken | null> {
    return prisma.userToken.findFirst({
      where: {
        ...tokenData,
        deletionDate: null,
        expiresAt: { gt: new Date() },
      },
    });
  }

  async revokeToken(
    tokendData: {tokenId: number,
    status: number,
    updateUserId: number}
  ): Promise<UserToken> {
    return prisma.userToken.update({
      where: { id: tokendData.tokenId },
      data: {
        status: tokendData.status,
        revokedAt: new Date(),
        deletionDate: new Date(),
        updateUserId: tokendData.updateUserId,
      },
    });
  }

  async revokeAllActiveAcessTokens(
    tokenData: {
      userId: number;
      type: number;
      statusActive: number;
      statusInactive: number;
    }
  ): Promise<{ count: number }> {
    return prisma.userToken.updateMany({
      where: {
        userId: tokenData.userId,
        type: tokenData.type,
        status: tokenData.statusActive,
        deletionDate: null,
      },
      data: {
        status: tokenData.statusInactive,
        revokedAt: new Date(),
        updateUserId: tokenData.userId,
        deletionDate: new Date(),
      },
    });
  }

  async revokeAllActiveRefreshTokens(
    tokenData: {
      userId: number;
      type: number;
      statusActive: number;
      statusInactive: number;
    }
  ): Promise<{ count: number }> {
    return prisma.userToken.updateMany({
      where: {
        userId: tokenData.userId,
        type: tokenData.type,
        status: tokenData.statusActive,
        deletionDate: null,
      },
      data: {
        status: tokenData.statusInactive,
        revokedAt: new Date(),
        updateUserId: tokenData.userId,
        deletionDate: new Date(),
      },
    });
  }
}
