export type AuthTokens = {
  token: string;
  refreshToken: string;
  expiresAt: Date;
};

export type AuthUserResponse = {
  id: number;
  username: string;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
};

export type AuthResponse = {
  user: AuthUserResponse;
  tokens: AuthTokens;
};