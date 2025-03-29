/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { UserTokenService } from '../services/AuthService';
import { UserTokenRepository } from '../repositories/AuthRepository';
import { UserRepository } from '../repositories/UserRepository';
import { UserTokenStatus, UserTokenType } from 'src/utils/PublicEnum';
import { ForbiddenError, InternalServerError, ValidationError } from 'src/errors/CustomError';

const userTokenRepository = new UserTokenRepository();
const userRepository = new UserRepository();
const userTokenService = new UserTokenService(userTokenRepository, userRepository);

export const authenticateUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
      throw new ValidationError("Token não fornecido");
    }
    console.log('Token recebido: ', token);
    const decoded = await userTokenService.serviceVerifyToken({ token });
    
    if (!decoded) {
      throw new ForbiddenError("Token inválido ou expirado");
    }
    console.log('usuário encontrado: ',decoded);
    const tokenEntity = await userTokenRepository.findValidToken({
          userId: decoded.userId,
          type: UserTokenType.AccessToken,
          status: UserTokenStatus.Active,
          revokedAt: null,
        });
    console.log('TokenEntity: ',tokenEntity);
    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      throw new ForbiddenError("Token inválido ou expirado");
    }

    if (tokenEntity.expiresAt < new Date()) {
      throw new ForbiddenError("Token inválido ou expirado");
    }
    
    next();
  } catch (error) {
    next(error) 
  }
};

// Middleware para verificar roles/permissões (opcional)
// export const authorize = (requiredRoles: string[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Implemente a lógica de autorização conforme necessário
//       // Exemplo: verificar se o usuário tem as roles necessárias
//       next();
//     } catch (error) {
//       return res.status(403).json({ error: 'Acesso não autorizado' });
//     }
//   };
// };