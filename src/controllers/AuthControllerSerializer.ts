import { User } from '@prisma/client';
import { AuthTokens, AuthResponse } from './AuthControllerTRA';

export const AuthSerializer = {
  serialize(user: User, tokens: AuthTokens): AuthResponse {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      tokens: {
        token: tokens.token,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      },
    };
  },
};