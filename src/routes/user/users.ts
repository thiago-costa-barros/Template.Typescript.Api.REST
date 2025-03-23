import express from 'express';
import { dependencies } from '../../dependencies';
//import { authenticateToken } from '../../middleware/auth'; // Middleware de autenticação

const router = express.Router();

// Rota protegida para obter informações do usuário
// router.get('/profile', authenticateToken, async (req, res) => {
//     const response = await dependencies.getUserProfileController.handle(req);
//     res.status(response.statusCode).json(response.body);
// });

// Outras rotas relacionadas ao usuário
router.get('/', async (req, res) => {
    const response = await dependencies.getUserController.handle(req);
    res.status(response.statusCode).json(response.body);
});

export default router;