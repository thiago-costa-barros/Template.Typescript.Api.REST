import express from "express";
import userRoutes from "./UsersRoutes";
import externalReceiverHotmartRoutes from "./ExternalWebhookReceiverHotmart";
//import authRoutes from './user/auth';

const router = express.Router();

// // Rotas de autenticação
// router.use('/auth', authRoutes);

// Rotas de usuário
router.use("/users", userRoutes);

// Rotas de recebeimento Webhook Hotmart
router.use("/external-receiver-hotmart", externalReceiverHotmartRoutes);

export default router;
