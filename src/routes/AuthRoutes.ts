import express from "express";
import { dependencies } from "src/dependencies";
import { authenticateUserToken } from "src/middlewares/AuthTokenMiddlewares";

const router = express.Router();

// Rota de login
router.post("/login", async (req, res, next) => {
  try {
    const response = await dependencies.userTokenController.login(req);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error); // Passa o erro para o middleware centralizado
  }
});

// Rota de refresh token
router.post("/refresh", async (req, res, next) => {
  try{
    const response = await dependencies.userTokenController.refreshToken(req);
    res.status(response.statusCode).json(response);
}
  catch (error) {
    next(error); // Passa o erro para o middleware centralizado
  }
});

// Rota de logout
router.get("/logout", authenticateUserToken, async (req, res, next) => {
  try{
    const response = await dependencies.userTokenController.logout(req);
    res.status(response.statusCode).json(response);
  }
  catch (error) {
    next(error); // Passa o erro para o middleware centralizado
  }
});

export default router;
