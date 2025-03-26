import express from "express";
import { dependencies } from "src/dependencies";
import { authenticateUserToken } from "src/middlewares/AuthTokenMiddlewares";

const router = express.Router();

// Rota de login
router.post("/login", async (req, res) => {
  const response = await dependencies.userTokenController.login(req);
  res.status(response.statusCode).json(response.body);
});

// Rota de refresh token
router.post("/refresh", async (req, res) => {
  const response = await dependencies.userTokenController.refreshToken(req);
  res.status(response.statusCode).json(response.body);
});

// Rota de logout
router.get("/logout", authenticateUserToken, async (req, res) => {
  const response = await dependencies.userTokenController.logout(req);
  res.status(response.statusCode).json(response.body);
});

export default router;
