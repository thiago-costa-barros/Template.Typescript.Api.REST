import express from 'express';
import userRoutes from './user/users';
import externalReceiverHotmartRoutes from './external-receiver/hotmart';
//import authRoutes from './user/auth';

const router = express.Router();

// // Rotas de autenticação
// router.use('/auth', authRoutes);

// Rotas de usuário
router.use('/users', userRoutes);

// Rotas de recebeimento Webhook Hotmart
router.use('/external-receiver-hotmart' , externalReceiverHotmartRoutes);

export default router;