// import express from 'express';
// import { dependencies } from '../../dependencies';

// const router = express.Router();

// // Rota de registro
// router.post('/register', async (req, res) => {
//     const response = await dependencies.registerUserController.handle(req);
//     res.status(response.statusCode).json(response.body);
// });

// // Rota de login
// router.post('/login', async (req, res) => {
//     const response = await dependencies.loginUserController.handle(req);
//     res.status(response.statusCode).json(response.body);
// });

// export default router;