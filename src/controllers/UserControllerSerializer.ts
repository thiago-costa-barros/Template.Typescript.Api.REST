import { User } from "@prisma/client";
import { CreateUserResponse, GetUserResponseData } from "./UserControllerTRA";
import { AuthTokens } from "./AuthControllerTRA";

export class UserSerializer {
  static serializerCreateUser(
    user: User,
    tokens: AuthTokens
  ): CreateUserResponse {
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
  }

  static serializerGetUser(user: User): GetUserResponseData {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };
  }
}
