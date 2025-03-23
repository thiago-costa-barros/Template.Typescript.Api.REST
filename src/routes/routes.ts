import express from 'express';
import userRoutes from './user/users';
//import authRoutes from './user/auth';

const router = express.Router();

// // Rotas de autenticação
// router.use('/auth', authRoutes);

// Rotas de usuário
router.use('/users', userRoutes);

export default router;