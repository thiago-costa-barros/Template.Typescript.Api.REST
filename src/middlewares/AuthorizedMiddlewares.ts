import { Request, Response, NextFunction } from "express";
import { UserRepository } from "src/repositories/UserRepository";
import { UserTokenService } from "src/services/AuthService";
import { UserTokenRepository } from "src/repositories/AuthRepository";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "src/errors/CustomError";

const userTokenRepository = new UserTokenRepository();
const userRepository = new UserRepository();
const userTokenService = new UserTokenService(
  userTokenRepository,
  userRepository
);

export async function IsAdminUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = await userTokenService.serviceGetUserIdFromRequest(req);

    if (!userId) {
      throw new ValidationError("Token não fornecido");
    }

    const user = await userRepository.verifyIsAdminUser(userId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    if (!user.isAdmin) {
      throw new ForbiddenError("Usuário não possui permissões");
    }

    next(); // Chama o próximo middleware}
  } catch (error) {
    next(error);
  }
}

export async function IsStaffUserOrSelf(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const requestedId = Number(req.params.id);
    const userId = await userTokenService.serviceGetUserIdFromRequest(req);

    const existsRequestId = await userRepository.getUserById(requestedId);

    if (!existsRequestId) {
      throw new NotFoundError("Usuário não encontrado");
    }

    if (!userId) {
      throw new UnauthorizedError("Usuário não autenticado");
    }

    const isStaffUser = await userRepository.verifyIsStaffUser(userId);

    if (isStaffUser?.isStaff) {
      return next();
    }

    if (userId !== requestedId) {
      throw new ForbiddenError("Usuário não possui permissões");
    }

    // Se passar em todas as verificações, segue para o próximo middleware/controller
    next();
  } catch (error) {
    next(error);
  }
}
