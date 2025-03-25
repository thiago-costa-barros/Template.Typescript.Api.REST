import express from "express";
import { dependencies } from "../../dependencies";
import { authenticateToken } from "../../middlewares/auth";
import { IsAdminUser } from "../../middlewares/isAdminUser";
import { IsStaffUserOrSelf } from "src/middlewares/isStaffUser";

const router = express.Router();

// Rota para listar usuários (apenas administradores)
router.get("/", authenticateToken, IsAdminUser, async (req, res) => {
  const response = await dependencies.userController.getUsers(req);
  res.status(response.statusCode).json(response.body);
});

// Rota para obter informações de um usuário específico
router.get("/:id", authenticateToken,IsStaffUserOrSelf, async (req, res) => {
  
  const response = await dependencies.userController.getUserById(req);
  res.status(response.statusCode).json(response.body);
});

// Rota para criar um usuário
router.post("/", async (req, res) => {
  const response = await dependencies.userController.createUser(req);
  res.status(response.statusCode).json(response.body);
});

export default router;
