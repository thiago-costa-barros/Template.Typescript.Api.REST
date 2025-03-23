export type CreateUserResponseData = {
    id: number;
    username: string;
    email: string | null;
    firstname: string | null;
    lastname: string | null;
  };

  export type CreateUserResponse = {
    user: CreateUserResponseData;
    tokens: {
      token: string;
      refreshToken: string;
    };
  };