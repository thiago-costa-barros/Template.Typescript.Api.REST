import { Request, Response, NextFunction } from 'express';
import { getUserIdFromRequest, verifyToken } from '../utils/AuthUtils';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
    return; // Retorna void
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(403).json({ error: 'Token inválido ou expirado' });
    return; // Retorna void
  }

  const userId = getUserIdFromRequest(req);

  if (!userId) {
    res.status(401).json({ error: 'Token inválido ou não fornecido' });
    return;
  }
  next(); // Chama o próximo middleware
}