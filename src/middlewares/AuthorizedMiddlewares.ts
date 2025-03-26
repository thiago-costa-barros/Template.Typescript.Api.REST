import { Request, Response, NextFunction } from "express";
import { UserRepository } from "src/repositories/UserRepository";
import { UserTokenService } from "src/services/AuthService";
import { UserTokenRepository } from "src/repositories/AuthRepository";

const userTokenRepository = new UserTokenRepository();
const userRepository = new UserRepository();
const userTokenService = new UserTokenService(userTokenRepository, userRepository);

export async function IsAdminUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = await userTokenService.serviceGetUserIdFromRequest(req);

  if (!userId) {
    res.status(401).json({ error: "Usuário não autenticado" });
    return; // Retorna void
  }

  const user = await userRepository.verifyIsAdminUser(userId)

  if (!user || !user.isAdmin) {
    res.status(403).json({ error: "Acesso negado: recurso permitido somente a usuários Administradores" });
    return; // Retorna void
  }

  next(); // Chama o próximo middleware
}

export async function IsStaffUserOrSelf(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const requestedId = Number(req.params.id);
  const userId = await userTokenService.serviceGetUserIdFromRequest(req);

  const existsRequestId = await userRepository.getUserById(requestedId)

  if (!existsRequestId) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return
  }

  if (!userId) {
    res.status(401).json({ error: "Usuário não autenticado" });
    return;
  }

  const isStaffUser = await userRepository.verifyIsStaffUser(userId)

  if (isStaffUser?.isStaff) {
    return next();
  }

  if (userId !== requestedId) {
    res.status(403).json({ error: "Acesso negado: recurso permitido somente ao próprio usuário ou equipe" });
    return;
  }

  // Se passar em todas as verificações, segue para o próximo middleware/controller
  next();

}
