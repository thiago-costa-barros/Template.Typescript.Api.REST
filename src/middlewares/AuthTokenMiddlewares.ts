/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { UserTokenService } from '../services/AuthService';
import { UserTokenRepository } from '../repositories/AuthRepository';
import { UserRepository } from '../repositories/UserRepository';
import { UserTokenStatus, UserTokenType } from 'src/utils/PublicEnum';

const userTokenRepository = new UserTokenRepository();
const userRepository = new UserRepository();
const userTokenService = new UserTokenService(userTokenRepository, userRepository);

export const authenticateUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return
    }

    const decoded = await userTokenService.serviceVerifyToken({ token });
    
    if (!decoded) {
      res.status(403).json({ error: 'Token inválido ou expirado' });
      return; // Retorna void
    }

    const tokenEntity = await userTokenRepository.findValidToken({
          userId: decoded.userId,
          token: token,
          type: UserTokenType.AccessToken,
          status: UserTokenStatus.Active,
          revokedAt: null,
        });

    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      res.status(403).json({ error: 'Token inválido ou expirado' });
      return; // Retorna void
    }

    if (tokenEntity.expiresAt < new Date()) {
      res.status(403).json({ error: 'Token expirado' });
      return; // Retorna void
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro na autenticação' });
    return 
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