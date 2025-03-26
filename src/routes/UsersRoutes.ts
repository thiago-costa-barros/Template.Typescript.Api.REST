import express from "express";
import { dependencies } from "../dependencies";
import { IsAdminUser, IsStaffUserOrSelf } from "../middlewares/AuthorizedMiddlewares";
import { authenticateUserToken } from "src/middlewares/AuthTokenMiddlewares";

const router = express.Router();

// Rota para listar usuários (apenas administradores)
router.get("/", authenticateUserToken, IsAdminUser, async (req, res) => {
  const response = await dependencies.userController.getUsers(req);
  res.status(response.statusCode).json(response.body);
});

// Rota para obter informações de um usuário específico
router.get(
  "/:id",
  authenticateUserToken,
  IsStaffUserOrSelf,
  async (req, res) => {
    const response = await dependencies.userController.getUserById(req);
    res.status(response.statusCode).json(response.body);
  }
);

// Rota para criar um usuário
router.post("/", async (req, res) => {
  const response = await dependencies.userController.createUser(req);
  res.status(response.statusCode).json(response.body);
});

export default router;
