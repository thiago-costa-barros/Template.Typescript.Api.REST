import express from "express";
import { dependencies } from "../dependencies";
import {
  IsAdminUser,
  IsStaffUserOrSelf,
} from "../middlewares/AuthorizedMiddlewares";
import { authenticateUserToken } from "src/middlewares/AuthTokenMiddlewares";

const router = express.Router();

// Rota para listar usuários (apenas administradores)
router.get("/", authenticateUserToken, IsAdminUser, async (req, res, next) => {
  try {
    const response = await dependencies.userController.getUsers(req);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error); // Passa o erro para o middleware centralizado
  }
});

// Rota para obter informações de um usuário específico
router.get(
  "/:id",
  authenticateUserToken,
  IsStaffUserOrSelf,
  async (req, res, next) => {
    try {
      const response = await dependencies.userController.getUserById(req);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error); // Passa o erro para o middleware centralizado
    }
  }
);

// Rota para criar um usuário
router.post("/", async (req, res, next) => {
  try {
    const response = await dependencies.userController.createUser(req);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error); // Passa o erro para o middleware centralizado
  }
});

export default router;
