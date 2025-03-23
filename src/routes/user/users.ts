import express from "express";
import { dependencies } from "../../dependencies";
// import { authenticateToken } from '../../middleware/auth'; // Middleware de autenticação

const router = express.Router();

// Rota para listar usuários
router.get("/", async (req, res) => {
  const response = await dependencies.userController.getUsers(req);
  res.status(response.statusCode).json(response.body);
});

// Rota para criar um usuário
router.post("/", async (req, res) => {
  const response = await dependencies.userController.createUser(req);
  res.status(response.statusCode).json(response.body);
});

// Rota protegida para obter informações do usuário (exemplo)
// router.get('/profile', authenticateToken, async (req, res) => {
//   const response = await dependencies.userController.getUserProfile(req);
//   res.status(response.statusCode).json(response.body);
// });

export default router;
