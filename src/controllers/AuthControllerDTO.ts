export interface GenerateTokenDTO {
  userId: number;
}

export interface VerifyTokenDTO {
  token: string;
  isRefresh?: boolean;
}

export type LoginDTO = {
  username: string;
  password: string;
};

export interface RefreshTokenDTO {
  refreshToken: string;
  updateUserId: number;
}

