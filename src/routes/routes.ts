import express from "express";
import userRoutes from "./UsersRoutes";
import authRoutes from './AuthRoutes';

const router = express.Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de usuário
router.use("/users", userRoutes);

export default router;
