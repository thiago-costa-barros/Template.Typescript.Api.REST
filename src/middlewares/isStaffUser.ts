import { Request, Response, NextFunction } from "express";
import { prisma } from "@lib/prisma";
import { getUserIdFromRequest } from "src/utils/AuthUtils";

export async function IsStaffUserOrSelf(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = getUserIdFromRequest(req);
  const requestedId = Number(req.params.id);
  
  const existsRequestId = await prisma.user.findUnique({
    where: {
      id: requestedId,
      deletionDate: null,
      isActive: true,
    },
  });

  // Se o usuário não existir (ou estiver desativado/excluído)
  if (!existsRequestId) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return
  }

  // Se não houver userId (token inválido/não autenticado)
  if (!userId) {
    res.status(401).json({ error: "Usuário não autenticado" });
    return;
  }

  // Verifica se o usuário é staff
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      deletionDate: null,
      isActive: true,
    },
    select: {
      isStaff: true,
    },
  });

  

  // Se for staff, permite acesso a qualquer ID
  if (user?.isStaff) {
    return next();
  }

  if (userId !== requestedId) {
    res.status(403).json({ error: "Acesso negado: recurso permitido somente ao próprio usuário ou equipe" });
    return;
  }

  // Se passar em todas as verificações, segue para o próximo middleware/controller
  next();
}