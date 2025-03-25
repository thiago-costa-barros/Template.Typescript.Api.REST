/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request } from 'express';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

// Verifica se as chaves estão definidas
if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("Chaves JWT não configuradas no ambiente.");
}

const JWT_EXPIRES_IN = "720h"; // Tempo de expiração do token
const REFRESH_TOKEN_EXPIRES_IN = "366d"; // Tempo de expiração do refresh token

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function generateRefreshToken(userId: number): string {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

export function verifyToken(token: string): { userId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
      userId: number;
    };
    if (typeof decoded.userId !== "number") {
      throw new Error(
        "Token inválido: userId não encontrado ou não é um número."
      );
    }
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getUserIdFromRequest(req: Request): number | null {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  //console.log("Token recebido:", token);
  if (!token) {
    return null; // Token não fornecido
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    //console.log("UserId: ", decoded.userId)
    return decoded.userId; // Retorna o userId do token
  } catch (error) {
    return null; // Token inválido ou expirado
  }
}
