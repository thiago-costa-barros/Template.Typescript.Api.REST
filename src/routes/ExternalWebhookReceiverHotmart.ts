import express from "express";
import { dependencies } from "../dependencies";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const response =
      await dependencies.controllers.externalWebhookReceiverController.CreateExternalWebhookReceiverHotmart(
        req
      );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error); // Passa o erro para o middleware centralizado
  }
});

export default router;
