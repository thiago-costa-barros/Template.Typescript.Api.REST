import { AuthTokens } from "./AuthControllerTRA";

export type GetUserResponseData = {
    id: number;
    username: string;
    email: string | null;
    firstname: string | null;
    lastname: string | null;
  };

  export type CreateUserResponse = {
    user: GetUserResponseData;
    tokens: AuthTokens
  };