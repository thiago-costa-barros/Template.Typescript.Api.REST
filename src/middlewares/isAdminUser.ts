import { Request, Response, NextFunction } from "express";
import { prisma } from "@lib/prisma";
import { getUserIdFromRequest } from "src/utils/AuthUtils";

export async function IsAdminUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    res.status(401).json({ error: "Usuário não autenticado" });
    return; // Retorna void
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      deletionDate: null,
      isActive: true,
      isAdmin: true,
    },
  });

  if (!user || !user.isAdmin) {
    res.status(403).json({ error: "Acesso negado: recurso permitido somente a usuários Administradores" });
    return; // Retorna void
  }

  next(); // Chama o próximo middleware
}
